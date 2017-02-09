import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: (backend, options) => {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

      let testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
      let testSendMail = { firstName: 'test', lastName: 'test' }
      let translations_de = {
        "NAV": {
          "home": "Startseite",
          "presentation": "Präsentation",
          "rooms": "Zimmer",
          "activities": "Aktivitäten",
          "visit": "Ausflüge",
          "gallery": "Foto-Galerie",
          "contact": "Kontakt",
          "admin": "Admin",
        }
      }
      let translations_fr = {
        "NAV": {
          "home": "Accueil",
          "presentation": "Présentation",
          "rooms": "Chambres",
          "activities": "Activités",
          "visit": "A visiter",
          "gallery": "Galerie Photo",
          "contact": "Contact",
          "admin": "Admin",
        },
        "HOME": {
          "TITLE": "Home",
          "SELECT": "Change la langue"
        },
        "PRESENTATION": {
          "title": "Soyez notre hôte Au Clos Gouzilh !",
          "text1": "Cette maison de caractère se situe à Saint-Aigulin, village le plus à l'Est du département de la Charente-Maritime, en Haute Saintonge, aux portes du Périgord, de la Gironde et de la Charente – point de départ idéal pour découvrir en un ou plusieurs jours des régions marquées par un large patrimoine culturel, archéologique, historique et gastronomique.",
          "text2": "Le soir venu, vous continuerez à rêver au calme dans une de nos chambres d'hôtes situées près des vignes et si vous le souhaitez, simplement partager une assiette gourmande avec vos hôtes Brigitte et Pascal."
        },
        "CONTACT": {
          "FirstName": "First Name",
          "LastName": "Last Name",
          "Email": "Email",
          "InvalidEmail": "Enter a valid email address",
          "Message": "Your Message",
          "InfoMail": "Do you want to receive information?",
          "SendMessage": "Send"
        },
        "ACTIVITIES": {
          "source": "Source"
        },
        "VISIT": {
          "source": "Source"
        }
      }
      let activities = [
        {
          title:'views.activities.subtitle1',
          todos: [
            {
              what: 'views.activities.SoireesSpecialesSaintAigulin.title',
              notes: 'views.activities.SoireesSpecialesSaintAigulin',
              link: ''
            },
            {
              what: 'views.activities.MarchesSaintAigulin.title',
              notes: 'views.activities.MarchesSaintAigulin',
              link: '',
              source: 'Le Petit Aigulinois'
            },
            {
              what: 'views.activities.BBB.title',
              notes: 'views.activities.BBB',
              link: 'http://www.google.ch'
            }
          ]
        },
        {
          title:'views.activities.subtitle2',
          todos: [
            {
              what: '2222',
              notes: 'views.activities.SoireesSpecialesSaintAigulin',
              link: ''
            },
            {
              what: '333',
              notes: 'views.activities.MarchesSaintAigulin',
              link: '',
              source: 'Le Petit Aigulinois'
            }
          ]
        }
      ]
      let visits = [
        {
          title:'views.visit.subtitle1',
          todos: [
            {
              what: 'views.visit.Jonzac.title',
              notes: 'views.visit.Jonzac',
              link: 'http://www.jonzac-tourisme.fr'
            },
            {
              what: 'views.visit.Pons.title',
              notes: 'views.visit.Pons',
              link: 'http://www.en-charente-maritime.com'
            }
          ]
        },
        {
          title:'views.visit.subtitle2',
          todos: [
            {
              what: '2222',
              notes: 'views.visit.SoireesSpecialesSaintAigulin'
            },
            {
              what: '333',
              notes: 'views.visit.MarchesSaintAigulin'
            }
          ]
        }
      ]

      console.log("Fake Backend Url: "  + connection.request.url);

      // wrap in timeout to simulate server api call
      setTimeout(() => {

        // fake authenticate api end point
        if (connection.request.url.endsWith('/api/authenticate.php') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          // check user credentials and return fake jwt token if valid
          if (params.username === testUser.username && params.password === testUser.password) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
            ));
          } else {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200 })
            ));
          }
        }

        // fake users api end point
        if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
          // check for fake auth token in header and return test users if valid, this security is implemented server side
          // in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [testUser] })
            ));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 401 })
            ));
          }
        }

        // fake activities api end point
        if (connection.request.url.endsWith('/api/activities') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: activities })
          ));
        }

        // fake visits api end point
        if (connection.request.url.endsWith('/api/visits') && connection.request.method === RequestMethod.Get) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: visits })
          ));
        }

        // fake sendEmail api end point
        if (connection.request.url.endsWith('/api/sendEmail') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());
          console.log("Fake Send Email params firstName: " + params.feedback.firstName);

          // check contact
          if (params.feedback.lastName === testSendMail.lastName && params.feedback.firstName === testSendMail.firstName) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: { message: 'ok' } })
            ));
          } else {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 500 })
            ));
          }
        }

        // fake translation service
        if (connection.request.url.startsWith('/assets/i18n/fr.json')) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: translations_fr })
          ));
        }
        if (connection.request.url.startsWith('/assets/i18n/de.json')) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: translations_de })
          ));
        }

      }, 500);

    });

    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};
