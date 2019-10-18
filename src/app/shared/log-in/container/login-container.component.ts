import { Component,  Injector, Input, OnInit} from '@angular/core';
import { rendersAuthMethodType } from '../methods/authMethods-decorator';
import { Store } from '@ngrx/store';
import { CoreState } from '../../../core/core.reducers';
import { AuthMethodModel } from '../../../core/auth/models/auth-method.model';

/**
 * This component represents a section that contains the submission license form.
 */
@Component({
  selector: 'ds-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  @Input() authMethodModel: AuthMethodModel;

  /**
   * Injector to inject a section component with the @Input parameters
   * @type {Injector}
   */
  public objectInjector: Injector;

  /**
   * Initialize instance variables
   *
   * @param {Injector} injector
   */
  constructor(private injector: Injector, private store: Store<CoreState>) {
  }

  /**
   * Initialize all instance variables
   */
  ngOnInit() {
    this.objectInjector = Injector.create({
      providers: [
        {provide: 'authMethodModelProvider', useFactory: () => (this.authMethodModel), deps: []},
      ],
      parent: this.injector
    });
  }

  /**
   * Find the correct component based on the AuthMethod's type
   */
  getAuthMethodContent(): string {
      return rendersAuthMethodType(this.authMethodModel.authMethodType)
  }

}
