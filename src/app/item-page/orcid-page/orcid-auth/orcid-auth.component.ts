import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationDataService } from '../../../core/data/configuration-data.service';
import { ItemDataService } from '../../../core/data/item-data.service';
import { RemoteData } from '../../../core/data/remote-data';
import { ResearcherProfileService } from '../../../core/profile/researcher-profile.service';
import { NativeWindowRef, NativeWindowService } from '../../../core/services/window.service';
import { Item } from '../../../core/shared/item.model';
import { getFirstCompletedRemoteData, getFirstSucceededRemoteDataPayload } from '../../../core/shared/operators';
import { NotificationsService } from '../../../shared/notifications/notifications.service';

@Component({
  selector: 'ds-orcid-auth',
  templateUrl: './orcid-auth.component.html',
  styleUrls: ['./orcid-auth.component.scss']
})
export class OrcidAuthComponent implements OnInit {

  missingAuthorizations$ = new BehaviorSubject<string[]>([]);

  unlinkProcessing = false;

  item: Item

  constructor(
    private configurationService: ConfigurationDataService,
    private researcherProfileService: ResearcherProfileService,
    protected translateService: TranslateService,
    private notificationsService: NotificationsService,
    private itemService: ItemDataService,
    private route: ActivatedRoute,
    @Inject(NativeWindowService) private _window: NativeWindowRef,
   ) { 
      this.itemService.findById(this.route.snapshot.paramMap.get('id'), true, true).pipe(getFirstCompletedRemoteData()).subscribe((data: RemoteData<Item>) => {
        this.item = data.payload;
      });
  }

  ngOnInit() {
    const scopes = this.getOrcidAuthorizations();
    return this.configurationService.findByPropertyName('orcid.scope')
      .pipe(getFirstSucceededRemoteDataPayload(),
        map((configurationProperty) => configurationProperty.values),
        map((allScopes) => allScopes.filter((scope) => !scopes.includes(scope))))
      .subscribe((missingScopes) => this.missingAuthorizations$.next(missingScopes));
  }

  getOrcidAuthorizations(): string[] {
    return this.item.allMetadataValues('cris.orcid.scope');
  }

  isLinkedToOrcid(): boolean {    
    return this.researcherProfileService.isLinkedToOrcid(this.item);
  }

  getOrcidNotLinkedMessage(): Observable<string> {
    const orcid = this.item.firstMetadataValue('person.identifier.orcid');
    if (orcid) {
      return this.translateService.get('person.page.orcid.orcid-not-linked-message', { 'orcid': orcid });
    } else {
      return this.translateService.get('person.page.orcid.no-orcid-message');
    }
  }

  getAuthorizationDescription(scope: string) {
    return 'person.page.orcid.scope.' + scope.substring(1).replace('/', '-');
  }

  onlyAdminCanDisconnectProfileFromOrcid(): Observable<boolean> {
    return this.researcherProfileService.onlyAdminCanDisconnectProfileFromOrcid();
  }

  ownerCanDisconnectProfileFromOrcid(): Observable<boolean> {
    return this.researcherProfileService.ownerCanDisconnectProfileFromOrcid();
  }

  linkOrcid(): void {
    this.researcherProfileService.getOrcidAuthorizeUrl(this.item).subscribe((authorizeUrl) => {
      this._window.nativeWindow.location.href = authorizeUrl;
    });
  }

  unlinkOrcid(): void {
    this.unlinkProcessing = true;
    this.researcherProfileService.unlinkOrcid(this.item).subscribe((remoteData) => {
      this.unlinkProcessing = false;
      if (remoteData.isSuccess) {
        this.notificationsService.success(this.translateService.get('person.page.orcid.unlink.success'));
      } else {
        this.notificationsService.error(this.translateService.get('person.page.orcid.unlink.error'));
      }
    });
  }

}
