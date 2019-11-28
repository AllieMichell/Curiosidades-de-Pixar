// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.


const Alexa = require('ask-sdk-core');


const toyStory= [
    "Tom Hanks es quien pone la voz a Woody en la versión original de Toy Story.",
    "El papel de voz del personaje Buzz Lightyear fue ofrecido a Billy Crystal, quien lo rechazó. En su lugar Tim Allen aceptó la oferta.",
    "92 mil 854 bocetos se dibujaron para la película.",
    "302 personajes aparecen en Toy Story 3. ¿Serías capaz de recordarlos a todos?."
    
    ];
const coco = [
    "La producción de COCO pasó más de tres años visitando mercados, plazas, cementerios de México para empaparse en la cultura y significado del Día de los Muertos.",
    "Es posible que no lo hayas notado, pero son varios los lugares reales que fueron inspiración para la película de COCO.",
    "Quizá nunca hayas visitado la tumba de Pedro Infante, pero la tumba de Ernesto de la Cruz que aparece en la película, es una réplica de la del cantante mexicano.",
    "¿Se te hizo muy familiar en el personaje Ernesto de la Cruz?, pues no te equivocaste, este personaje está inspirado en los grandes cantantes mexicanos Pedro Infante y Jorge Negrete.",
    "La película está inspirada en las tradiciones mexicanas. Quizá no lo notaste pero en Coco podemos ver diversas personalidades emblemáticas de la historia de México como: Frida Kahlo, Pedro Infante, Jorge Negrete, El Santo, María Félix, Cantinflas y hasta el revolucionario Emiliano Zapata.",
    
    ]; 
const nemo = [
    "Todos recordamos que en algún momento de la cinta las gaviotas de los puertos de Sidney tienen un papel importante, especialmente cuando persiguen a Marlin y a Dory para comérselos. Uno de los gestos de esas aves eran sus sonidos. Originalmente, las gaviotas decían mine (mío), y en español latino, por ejemplo, se tradujo a no hay. Así la expresión de las gaviotas fue traducida a distintos idiomas.",
    "Para realizar el filme el director Andrew Stanton recibió un curso sobre peces y sobre el mar, para lograr el mayor realismo posible en la cinta, y que sus peces se comportaran como peces reales.",
    "Dos años antes de que su película llegase a los cines, el propio Nemo ya se había dejado ver en Monstruos S. A. Justamente en la escena donde la pequeña Boo le ofrece juguetes al asustador Sulley.",
    "Hacer un solo cuadro de alguna película de Pixar toma aproximadamente 6 horas de trabajo, cada cuadro es 1/24 de un segundo de tiempo en la pantalla. Pero esta película llevaba más dedicación, hubo algunos marcos que tomaron hasta cuatro días."
    ];


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a curiosidades pixar, tengo curiosidades de: coco, toy story y nemo. ¿De qué quieres saber?';
        const speakReprompt = 'Tengo datos de: nemo, toy story y coco. ¿De cuál quieres saber?'
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakReprompt)
            .getResponse();
    }
};


const datoCuriosoHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'datoCuriosoIntent';
    },
    handle(handlerInput) {
        var speechOutput='';
        const request = handlerInput.requestEnvelope.request;
        var pelicula = request.intent.slots.pelicula.value;
    switch(pelicula){
        case "nemo":
             speechOutput = nemo[Math.floor(Math.random()*nemo.length)];
            break;
        case "coco":
             speechOutput = coco[Math.floor(Math.random()*coco.length)];
            break;
        case "toy story":
             speechOutput = toyStory[Math.floor(Math.random()*toyStory.length)];
            break;
        default:
            speechOutput = 'no tenemos esa película';
            break;
    }
        

        return handlerInput.responseBuilder
            .speak(`${speechOutput} para saber otro dato curioso puedes decir, dime otro dato`)
            .reprompt('puedes decir dime otro para saber otro dato curioso')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '<say-as interpret-as="interjection">así qué chiste</say-as>';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        datoCuriosoHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
