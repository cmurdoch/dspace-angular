import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';
import { CollectionElementLinkType } from '../../../../../shared/object-collection/collection-element-link.type';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { ItemAdminSearchResultListElementComponent } from './item-admin-search-result-list-element.component';
import { Item } from '../../../../../core/shared/item.model';
import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { DSONameServiceMock } from '../../../../../shared/mocks/dso-name.service.mock';
import { APP_CONFIG } from '../../../../../../config/app-config.interface';
import { environment } from '../../../../../../environments/environment';
import { mockTruncatableService } from '../../../../../shared/mocks/mock-trucatable.service';
import {
  ListableObjectComponentLoaderComponent
} from '../../../../../shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { ItemAdminSearchResultActionsComponent } from '../../item-admin-search-result-actions.component';

describe('ItemAdminSearchResultListElementComponent', () => {
  let component: ItemAdminSearchResultListElementComponent;
  let fixture: ComponentFixture<ItemAdminSearchResultListElementComponent>;
  let id;
  let searchResult;

  function init() {
    id = '780b2588-bda5-4112-a1cd-0b15000a5339';
    searchResult = new ItemSearchResult();
    searchResult.indexableObject = new Item();
    searchResult.indexableObject.uuid = id;
  }

  beforeEach(waitForAsync(() => {
    init();
    TestBed.configureTestingModule({
    imports: [
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        ItemAdminSearchResultListElementComponent
    ],
    providers: [
      { provide: TruncatableService, useValue: mockTruncatableService },
      { provide: DSONameService, useClass: DSONameServiceMock },
        { provide: APP_CONFIG, useValue: environment }],
    schemas: [NO_ERRORS_SCHEMA]
})
      .overrideComponent(ItemAdminSearchResultListElementComponent, {
        remove: { imports: [ListableObjectComponentLoaderComponent, ItemAdminSearchResultActionsComponent]}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAdminSearchResultListElementComponent);
    component = fixture.componentInstance;
    component.object = searchResult;
    component.linkTypes = CollectionElementLinkType;
    component.index = 0;
    component.viewModes = ViewMode;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
