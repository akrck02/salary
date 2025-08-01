const DEFAULT_CONFIGURATION_ID = "gtd"

/** 
* The id of the configuration used in the LocalStorage API 
* NOTE: Change this value with your app name.
*/
const configurationId = DEFAULT_CONFIGURATION_ID

/**
 * Load a JSON file as the configuration of the app
 * @param path The file path
 */
export async function loadConfiguration(path : string) {
  assertIdHasBeenChanged()
  
  const loadedConfiguration = await fetch(path).then(res => res.json())
  for (const id in loadedConfiguration) {  
    setConfiguration(id, loadedConfiguration[id])
  }
}

/**
 * Set a configuration parameter
 * @param id The configuration parameter id 
 * @param value The value to set 
 */
export function setConfiguration(id : string, value: string) {
  assertIdHasBeenChanged()
  localStorage[id] = value
}

/**
 * Get configuration value
 * @param id The parameter id
 * @returns The parameter value
 */
export function getConfiguration(id : string) : string {
  assertIdHasBeenChanged()
  return localStorage[id]
}

/**
 * Assert that the id has been changed 
 */
function assertIdHasBeenChanged() {
  if(DEFAULT_CONFIGURATION_ID == configurationId){
    console.warn(`The configuration id need to be changed, please go to configuration.ts file and change the configurationId variable.`)
  }
}
