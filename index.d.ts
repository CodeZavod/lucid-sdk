
declare var LucidSDK: LucidSDK.LucidSDKStatic;

export = LucidSDK;

declare namespace LucidSDK {
    interface LucidSDKStatic {
        new (): LucidSDK;
    }

    interface LucidSDK {
        setEnvironment(env: string): LucidSDK;
        setApiKey(apiKey: string): LucidSDK;
        getGlobalDefinitions(bundles: string[] | string): SendPromise;
        getSuppliers(): LucidSDK;
        getBusinessUnits(): SendPromise;
        getStandardQuestions(CountryLanguageID: number): SendPromise;
        getCustomQuestions(CountryLanguageID: number): SendPromise;
        getQuestionText(CountryLanguageID: number, QuestionID: number): SendPromise;
        getQuestionOptions(CountryLanguageID: number, QuestionID: number): SendPromise;
        getExchangeSurveys(SupplierCode: string | number): SendPromise;
        getAllocatedSurveys(SupplierCode: string | number): SendPromise;
        getAllocatedSurvey(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        getRecentlyAllocatedSurveys(date: string | Date | number, SupplierCode: string | number): SendPromise;
        getSurveyGroups(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        getQualifications(SurveyNumber: number): SendPromise;
        getQuotas(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        createLink(SupplierCode: string | number, SurveyNumber: number, data: SupplierLinkCreate): SendPromise;
        updateLink(SupplierCode: string | number, SurveyNumber: number, data: SupplierLinkUpdate): SendPromise;
        getLink(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        getStatistics(SupplierCode: string | number, SurveyNumber: number, scope: string, timestamp: string): SendPromise;
        // TODO: describe more methods ...


        _request(url: string): Request;
    }

    interface SupplierLinkCreate {
        SupplierLinkTypeCode: string;
        TrackingTypeCode: string;
        DefaultLink?: string;
        SuccessLink?: string;
        FailureLink?: string;
        OverQuotaLink?: string;
        QualityTerminationLink?: string;
    }

    interface SupplierLinkUpdate {
        SupplierLinkTypeCode: string;
        TrackingTypeCode: string;
        DefaultLink: string;
        SuccessLink: string;
        OverQuotaLink: string;
        QualityTerminationLink: string;
    }

    interface Request extends Promise<any> {
        new (url: string, sdk: LucidSDK): Request;
        setQuery(query: object): Request;
        setBody(body: object): Request;
        setMethod(method: string): Request;
        send(): SendPromise;
        then(): SendPromise;
        catch(): SendPromise;
        tap(): SendPromise;
    }

    interface SendPromise extends Promise<any> {}
}
