# Important

This is unofficial repository. It has been written for internal use and do not fit common Open Source Project requirements.
You still can send PR or issue, but remember this.

# Installation

Install and save it to `package.json`:
```
npm i lucid-sdk -S
```

# Usage

```javascript

const LucidSDK = require('lucid-sdk'),
    sdk = new LucidSDK();

sdk.setEnvironment('production').setApiKey('xxxxx-xxxx-xxxx-xxxx-xxxxx');

sdk.getGlobalDefinitions().then((resp1) => {
    return sdk.getStandardQuestions(9); // 9 - is USA country code
}).then(() => {
    // do something else
}).catch((err) => {
    console.error(err);
});

```

# API (docs in progress)

* `constructor()`
    
    Create new instance of SDK.
     
* `setEnvironment(environment: string)`

    Set environment (production and staging are available). Environment responsible only for API host. Production by default.

* `setApiKey(apiKey: string)`

    Set api key.

* `getGlobalDefinitions()`
    
    Return global definitions.

* `getStandardQuestions(CountryLanguageID: number)`

    Return standard questions list.

`// TODO: describe more methods ...`
