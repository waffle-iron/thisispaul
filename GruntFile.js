module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: ['app'],
            assets: ['<%= project.app %>/assets']
        },
        compass: {
            dist: {
                options: {
                    sassDir: '<%= project.assets %>/scss/',
                    cssDir: '<%= project.assets %>/css/',
                    sourcemap: true
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('build', 'Building development and production files', function () {
        grunt.task.run('compass');
    });

    grunt.registerTask('default', [
        'watch'
    ]);
};