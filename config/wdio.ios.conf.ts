const devices = require('./devices');
const path = require('path');
const { config } = require('./wdio.shared.conf');
const args = process.argv.slice(2); // Obtener los parámetros de la línea de comandos
const device = args.includes('--device')
  ? args[args.indexOf('--device') + 1]
  : 'attached';

const PLATFORM_NAME = 'iOS';
const AUTOMATION_NAME = 'XCUITest';
const PATH_TO_APP = path.join(
  process.cwd(),
  'app/ios/MVCTodo.app',
);


// ====================
// Runner Configuration
// ====================
config.port = 4723;

// ==================
// Specify Test Files
// ==================
config.specs = ['../test/specs/ios/**/*.ts'];

// ============
// Capabilities
// ============
if (device === 'attached') {
  config.capabilities = [
    {
      'appium:platformName': PLATFORM_NAME,
      'appium:platformVersion': devices.IOS_ATTACHED_VERSION,
      'appium:deviceName': devices.IOS_ATTACHED_NAME,
      'appium:udid': devices.IOS_ATTACHED_UDID,
      'appium:automationName': AUTOMATION_NAME,
      'appium:app': PATH_TO_APP,
    },
  ];
} else if((device === 'simulated')) {
  config.capabilities = [
    {
      'appium:platformName': PLATFORM_NAME,
      'appium:platformVersion': devices.IOS_SIMULATED_VERSION,
      'appium:deviceName': devices.IOS_SIMULATED_NAME,
      'appium:automationName': AUTOMATION_NAME,
      'appium:app': PATH_TO_APP,
    },
  ];
} else {
  console.warn('NOT A VALID DEVICE');
}

exports.config = config;
