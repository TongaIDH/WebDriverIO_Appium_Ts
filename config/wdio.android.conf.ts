const devices = require('./devices');
const path = require('path');
const { config } = require('./wdio.shared.conf');
const args = process.argv.slice(2); // Obtener los parámetros de la línea de comandos
const device = args.includes('--device')
  ? args[args.indexOf('--device') + 1]
  : 'emulated';

const PLATFORM_NAME = 'Android';
const AUTOMATION_NAME = 'UIAutomator2';
const PATH_TO_APP = path.join(
  process.cwd(),
  'app/android/ColorNote+Notepad.apk',
);

// ====================
// Runner Configuration
// ====================
config.port = 4723;

// ==================
// Specify Test Files
// ==================
config.specs = ['../test/specs/android/**/*.ts'];

// ============
// Capabilities
// ============
if (device === 'attached') {
  config.capabilities = [
    {
      'appium:platformName': PLATFORM_NAME,
      'appium:platformVersion': devices.ANDROID_ATTACHED_VERSION,
      'appium:deviceName': devices.ANDROID_ATTACHED_NAME,
      'appium:automationName': AUTOMATION_NAME,
      'appium:app': PATH_TO_APP,
    },
  ];
} else if (device === 'emulated') {
  config.capabilities = [
    {
      'appium:platformName': PLATFORM_NAME,
      'appium:platformVersion': devices.ANDROID_EMULATED_VERSION,
      'appium:deviceName': devices.ANDROID_EMULATED_NAME,
      'appium:automationName': AUTOMATION_NAME,
      'appium:app': PATH_TO_APP,
    },
  ];
} else {
  console.warn('NOT A VALID DEVICE');
}

exports.config = config;
