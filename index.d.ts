
declare var LucidSDK: LucidSDK.LucidSDKStatic;

export = LucidSDK;

declare namespace LucidSDK {
    interface LucidSDKStatic {
        new (): LucidSDK;
    }

    interface LucidSDK {
        setEnvironment(env: string): LucidSDK;
        setApiKey(apiKey: string): LucidSDK;
        getGlobalDefinitions(bundles: string[] | string): SendPromise<GlobalDefinitions>;
        getSuppliers(): SendPromise<SuppliersResponse>;
        getBusinessUnits(): SendPromise;
        getStandardQuestions(CountryLanguageID: number): SendPromise<StandardQuestionsResponse>;
        getCustomQuestions(CountryLanguageID: number): SendPromise;
        getQuestionText(CountryLanguageID: number, QuestionID: number): SendPromise;
        getQuestionOptions(CountryLanguageID: number, QuestionID: number): SendPromise<QuestionOptionsResponse>;
        getExchangeSurveys(SupplierCode: string | number): SendPromise;
        getAllocatedSurveys(SupplierCode: string | number): SendPromise;
        getAllocatedSurvey(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        getRecentlyAllocatedSurveys(date: string | Date | number, SupplierCode: string | number): SendPromise;
        getSurveyGroups(SupplierCode: string | number, SurveyNumber: number): SendPromise;
        getQualifications(SurveyNumber: number): SendPromise<QualificationsResponse>;
        getQuotas(SupplierCode: string | number, SurveyNumber: number): SendPromise<QuotasResponse>;
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

    interface SendPromise<T = any> extends Promise<T> {}

    interface GenericDefinition {
        Code: string;
        Id: string;
        IsActive?: boolean;
        Name: string;
        SortOrder: number;
    }

    interface GlobalDefinitions {
        AllBidProbabilities: GenericDefinition[];
        AllBidStatuses: GenericDefinition[];
        AllCategoryLockOutDurations: GenericDefinition[];
        AllCountries: GenericDefinition[];
        AllCountryLanguages: GenericDefinition[];
        AllIndustries: GenericDefinition[];
        AllProposalTypes: GenericDefinition[];
        AllQuestionClassifications: GenericDefinition[];
        AllSampleTypes: GenericDefinition[];
        AllStudyTypes: GenericDefinition[];
        AllSupplierLinkTypes: GenericDefinition[];
        AllSupplierPreferenceTypes: GenericDefinition[];
        AllSupplierRequestStatuses: GenericDefinition[];
        AllSupplierTrackingUrlTypes: GenericDefinition[];
        AllSurveyPlatforms: GenericDefinition[];
        AllSurveyStatuses: GenericDefinition[];
        AllThirdPartyServices: GenericDefinition[];
    }

    interface QuestionOption {
        OptionText: string;
        ParentItemText: string | null;
        Precode: string;
        QuestionID: number;
    }

    interface Question {
        IsCoreDemographic: boolean;
        IsFeasibilityFactor: boolean;
        LK_QuestionClassificationID: number | null;
        Name: string;
        QuestionID: number;
        QuestionText: string;
        QuestionType: string;
        SurveyUse: number;
        QuestionOptions?: QuestionOption[];
    }

    interface Supplier {
        Name: string;
        Code: string;
    }

    interface SupplierAccount {
        AccountName: string;
        Suppliers: Supplier[];
    }

    interface QuotaQuestion {
        QuestionID: number;
        LogicalOperator: string;
        PreCodes: string[];
    }

    interface Quota {
        SurveyQuotaID: number;
        SurveyQuotaType: string;
        QuotaCPI: number;
        Conversion: number;
        NumberOfRespondents: number;
        Questions: QuotaQuestion[] | null;
    }

    interface Qualification {
        SurveyNumber: number;
        Questions: QuotaQuestion[];
    }

    interface ApiResponse {
        ApiResult: number;
        ApiResultCode: number;
        ApiAccount: string;
        AccountType: number;
        ApiAccountStatus: number;
        AccountCode: string;
        ApiMessages: string[];
        ResultCount: number;
    }

    interface StandardQuestionsResponse extends ApiResponse {
        Questions: Question[];
    }

    interface QuestionOptionsResponse extends ApiResponse {
        QuestionOption: QuestionOption[];
    }

    interface SuppliersResponse extends ApiResponse {
        AccountsWithSuppliers: SupplierAccount[];
    }

    interface QuotasResponse extends ApiResponse {
        SurveyNumber: number;
        SurveyQuotas: Quota[];
    }

    interface QualificationsResponse extends ApiResponse {
        SurveyQualification: Qualification;
    }
}
