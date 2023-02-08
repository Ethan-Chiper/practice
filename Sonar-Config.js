const SonarQubeScanner = require('sonarqube-scanner');
const Config = require('./Helpers/Config');

SonarQubeScanner(
    {
        serverUrl: 'http://192.168.0.108:9000',
        options: {
            'sonar.projectDescription': 'This is a Node JS application',
            'sonar.projectName': 'sample-project',
            'sonar.projectKey': 'sample-project',
            'sonar.login': 'sqp_75f109a9fd6003f148b9611746f9981b36547654',
            'sonar.projectVersion': '1.0',
            'sonar.language': 'js',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.sources': '.',
            //'sonar.tests': 'specs',
            //'sonar.inclusions' : 'src/**'
            'sonar.java.binaries': '**/*.java'
        }
    },
    () => {}
);