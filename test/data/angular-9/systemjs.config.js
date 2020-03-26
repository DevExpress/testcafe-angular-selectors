/*global System*/

(function () {
    System.config({
        paths: {
            'npm:': '/node_modules/'
        },
        map: {
            'app':                                  'app',
            '@angular/animations':                  'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser':          'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/core':                        'npm:@angular/core/bundles/core.umd.js',
            '@angular/common':                      'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http':                 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/compiler':                    'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser':            'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic':    'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/router':                      'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade':              'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms':                       'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade':                     'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static':              'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            'rxjs':                                 'npm:rxjs',
            'tslib':                                'npm:tslib/tslib.js',
            'angular-in-memory-web-api':            'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        packages: {
            app: {
                main:             './main.js',
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            'rxjs/ajax': {
                main:             'index.js',
                defaultExtension: 'js'
            },
            'rxjs/operators': {
                main:             'index.js',
                defaultExtension: 'js'
            },
            'rxjs/testing': {
                main:             'index.js',
                defaultExtension: 'js'
            },
            'rxjs/websocket': {
                main:             'index.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                main:             'index.js',
                defaultExtension: 'js'
            },
        }
    });
})();
