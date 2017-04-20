/* jshint asi: true, esversion: 6, node: true */

'use strict'

module.exports = grunt =>
{
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt)

    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),

        clean:
        {
            dist: ['dist/client/*', 'dist/client/.*', '!dist/client/.gitkeep']
        },

        copy:
        {
            client: {
                expand: true,
                cwd: 'src/client',
                src: ['./**/*', '!./**/*.ts', '!./node_modules/**/*', '!./node_modules'],
                dest: 'dist/client/'
            }
        },

        symlink:
        {
            node_modules:
            {
                src:  'src/client/node_modules',
                dest: 'dist/client/node_modules'
            }
        },

        ts:
        {
            client:
            {
                src: ['src/client/**/*.ts', '!src/client/node_modules/**'],
                dest: 'dist/client',
                options:
                {
                    target: 'es5',
                    module: 'commonjs',
                    moduleResolution: 'node',
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    lib: [ 'es2015', 'dom' ],
                    noImplicitAny: true,
                    suppressImplicitAnyIndexErrors: true
                }
            }
        }
    })

    grunt.registerTask('build:dev', ['clean:dist', 'ts:client', 'copy:client', 'symlink:node_modules'])

    grunt.registerTask('default', ['build:dev'])
}
