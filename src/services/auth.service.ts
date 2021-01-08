import Keycloak from 'keycloak-js';

const BASE_AUTH = process.env.VUE_APP_BASE_AUTH;
const keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
  'realm': 'dipol',
  'clientId': 'dipol-analitico',
  'url': BASE_AUTH,
  'ssl-required': 'external',
  'public-client': true,
});

export class AuthService {

  public static init(): Promise<any> {
    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve({
            data: {
              authz: keycloakAuth,
            },
          });
        })
        .error((error) => reject(error));
    });
  }

  public static updateToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      keycloakAuth.updateToken(60)
        .success((refreshed) => {
          if (refreshed) {
            // tslint:disable-next-line:no-console
            console.debug('Token was successfully refreshed');
          } else {
            // tslint:disable-next-line:no-console
            console.debug('Token is still valid');
          }

          return resolve(refreshed);
        })
        .error((error) => {
          return reject(error);
        });
      });
  }

  public static logout(): Keycloak.KeycloakPromise<void, void> {
    /* redirectUri - para voltar sempre a página inicial */
    return keycloakAuth.logout({ redirectUri: window.location.origin });
  }

  public static loadUserProfile(): Keycloak.KeycloakPromise<Keycloak.KeycloakProfile, void> {
    return keycloakAuth.loadUserProfile();
  }
}
