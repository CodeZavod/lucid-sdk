
const format = require('date-fns/format'),
    Request = require('./Request'),
    Errors = require('./Errors');

class LucidSDK {
    constructor() {
        this.apiHost = LucidSDK.environments['production'];
    }

    setEnvironment(env) {
        if (Object.keys(LucidSDK.environments).indexOf(env) === -1) {
            throw new Error('unknown environment. available are: ' + Object.keys(LucidSDK.environments).join(', '));
        }

        this.apiHost = LucidSDK.environments[env];

        return this;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;

        return this;
    }

    /**
     *
     * @param {String|String[]} bundles
     * @return {*}
     */
    getGlobalDefinitions(bundles = LucidSDK.defaultBundles) {
        if (!Array.isArray(bundles)) {
            bundles = [bundles];
        }

        return this._request(`/Lookup/v1/BasicLookups/BundledLookups/${bundles.join(',')}`);
    }

    getSuppliers() {
        return this._request(`/Core/v1/Suppliers/AllWithAccount`);
    }

    getBusinessUnits() {
        return this._request(`/Core/v1/BusinessUnits/All`);
    }

    /**
     *
     * @param {Number} CountryLanguageID
     * @return {*}
     */
    getStandardQuestions(CountryLanguageID) {
        if (!CountryLanguageID) {
            throw new Error('`CountryLanguageID` argument is required');
        }

        return this._request(`/Lookup/v1/QuestionLibrary/AllQuestions/${CountryLanguageID}`);
    }

    /**
     *
     * @param {Number} CountryLanguageID
     * @return {*}
     */
    getCustomQuestions(CountryLanguageID) {
        if (!CountryLanguageID) {
            throw new Error('`CountryLanguageID` argument is required');
        }

        return this._request(`/Lookup/v1/QuestionLibrary/AllCustomQuestionsByAccount/${CountryLanguageID}`);
    }

    /**
     *
     * @param {Number} CountryLanguageID
     * @param {Number} QuestionID
     * @return {*}
     */
    getQuestionText(CountryLanguageID, QuestionID) {
        if (!CountryLanguageID) {
            throw new Error('`CountryLanguageID` argument is required');
        }
        if (!QuestionID) {
            throw new Error('`QuestionID` argument is required');
        }

        return this._request(`/Lookup/v1/QuestionLibrary/QuestionById/${CountryLanguageID}/${QuestionID}`);
    }

    /**
     *
     * @param {Number} CountryLanguageID
     * @param {Number} QuestionID
     * @return {*}
     */
    getQuestionOptions(CountryLanguageID, QuestionID) {
        if (!CountryLanguageID) {
            throw new Error('`CountryLanguageID` argument is required');
        }
        if (!QuestionID) {
            throw new Error('`QuestionID` argument is required');
        }

        return this._request(`/Lookup/v1/QuestionLibrary/AllQuestionOptions/${CountryLanguageID}/${QuestionID}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    getExchangeSurveys(SupplierCode) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Supply/v1/Surveys/AllOfferwall/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    getAllocatedSurveys(SupplierCode) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Supply/v1/Surveys/SupplierAllocations/All/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getAllocatedSurvey(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/Surveys/SupplierAllocations/BySurveyNumber/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Date|Number} date
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    getRecentlyAllocatedSurveys(date, SupplierCode) {
        if (!date) {
            throw new Error('`date` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (typeof date === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('`date` should follow `YYYY-MM-DD` format');
        }
        if (typeof date === 'number') {
            date = format(new Date(date), 'YYYY-MM-DD');
        } else if (date instanceof Date) {
            date = format(date, 'YYYY-MM-DD');
        }

        return this._request(`/Supply/v1/Surveys/SupplierAllocations/ByDate/${date}/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getSurveyGroups(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/Surveys/SurveyGroups/BySurveyNumber/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getQualifications(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/SurveyQualifications/BySurveyNumberForOfferwall/${SurveyNumber}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getQuotas(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/SurveyQuotas/BySurveyNumber/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.SupplierLinkTypeCode
     * @param {String} data.TrackingTypeCode
     * @param {String} [data.DefaultLink]
     * @param {String} [data.SuccessLink]
     * @param {String} [data.OverQuotaLink]
     * @param {String} [data.QualityTerminationLink]
     * @return {*}
     */
    createLink(SupplierCode, SurveyNumber, data) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (LucidSDK.trackingCodeTypes.indexOf(data.TrackingTypeCode) === -1) {
            throw new Error('`data.TrackingTypeCode` should be one of: ' + LucidSDK.trackingCodeTypes.join(','));
        }

        return this._request(`/Supply/v1/SupplierLinks/Create/${SurveyNumber}/${SupplierCode}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.SupplierLinkTypeCode
     * @param {String} data.TrackingTypeCode
     * @param {String} data.DefaultLink
     * @param {String} data.SuccessLink
     * @param {String} data.OverQuotaLink
     * @param {String} data.QualityTerminationLink
     * @return {*}
     */
    updateLink(SupplierCode, SurveyNumber, data) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (LucidSDK.trackingCodeTypes.indexOf(data.TrackingTypeCode) === -1) {
            throw new Error('`data.TrackingTypeCode` should be one of: ' + LucidSDK.trackingCodeTypes.join(','));
        }

        return this._request(`/Supply/v1/SupplierLinks/Update/${SurveyNumber}/${SupplierCode}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getLink(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/SupplierLinks/BySurveyNumber/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @param {String} Scope
     * @param {String} Timespan
     * @return {*}
     */
    getStatistics(SupplierCode, SurveyNumber, Scope, Timespan) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!Scope) {
            throw new Error('`Scope` argument is required');
        }
        if (!Timespan) {
            throw new Error('`Timespan` argument is required');
        }

        return this._request(`/Supply/v1/SurveyStatistics/BySurveyNumber/${SurveyNumber}/${SupplierCode}/${Scope}/${Timespan}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {String} Scope
     * @param {String} Timespan
     * @return {*}
     */
    getStatisticList(SupplierCode, Scope, Timespan) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!Scope) {
            throw new Error('`Scope` argument is required');
        }
        if (!Timespan) {
            throw new Error('`Timespan` argument is required');
        }

        return this._request(`/Supply/v1/SurveyStatistics/All/${SupplierCode}/${Scope}/${Timespan}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getMarketingInfo(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/Surveys/MarketingInformation/BySurveyNumber/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {String|Number} SupplierCode
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getQualifiedRespondents(SupplierCode, SurveyNumber) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Supply/v1/SurveyQualifiedRespondents/BySurveyNumberSupplierCode/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.AccountID
     * @param {Number} [data.SurveyStatusCode]
     * @param {Number} [data.SurveyPriority]
     * @param {String} data.SurveyName
     * @param {Number} data.CountryLanguageID
     * @param {Number} [data.IndustryID]
     * @param {Number} [data.StudyTypeID]
     * @param {Number} [data.ClientCPI]
     * @param {Number} [data.QuotaCPI]
     * @param {String} data.ClientSurveyLiveURL
     * @param {String} data.TestRedirectURL
     * @param {String} [data.IsActive]
     * @param {Number} [data.Quota]
     * @param {Number} [data.FulcrumExchangeAllocation]
     * @param {Boolean} [data.FulcrumExchangeHedgeAccess]
     * @param {Boolean} [data.IsVerifyCallBack]
     * @param {Boolean} [data.UniquePID]
     * @param {Boolean} [data.UniqueIPAddress]
     * @param {Boolean} [data.IsRelevantID]
     * @param {Boolean} [data.IsDedupe]
     * @param {Boolean} [data.IsGeoIP]
     * @param {Boolean} [data.IsFraudProfile]
     * @param {Number} [data.FraudProfileThreshold]
     * @param {Boolean} [data.IsTrueSample]
     * @param {Number} [data.QuotaCalculationTypeID]
     * @param {Number} [data.SurveyPlatformID]
     * @param {Number} [data.BidLengthOfInterview]
     * @param {Number} data.BusinessUnitID
     * @param {Number} [data.SampleTypeID]
     * @param {Number} [data.BidIncidence]
     * @param {Boolean} [data.CollectsPII]
     * @return {XWikiSDK.Request}
     */
    createSurvey(data) {
        return this._request(`/Demand/v1/Surveys/Create`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {Number} data.AccountID
     * @param {Number} data.SurveyStatusCode
     * @param {Number} data.SurveyPriority
     * @param {String} data.SurveyName
     * @param {Number} data.SurveyNumber
     * @param {Number} data.CountryLanguageID
     * @param {Number} data.IndustryID
     * @param {Number} data.StudyTypeID
     * @param {Number} data.ClientCPI
     * @param {Number} data.QuotaCPI
     * @param {String} data.ClientSurveyLiveURL
     * @param {String} data.TestRedirectURL
     * @param {String} data.IsActive
     * @param {Number} data.Quota
     * @param {Number} data.FulcrumExchangeAllocation
     * @param {Boolean} data.FulcrumExchangeHedgeAccess
     * @param {Boolean} data.IsVerifyCallBack
     * @param {Boolean} data.UniquePID
     * @param {Boolean} data.UniqueIPAddress
     * @param {Boolean} data.IsRelevantID
     * @param {Boolean} data.IsDedupe
     * @param {Boolean} data.IsGeoIP
     * @param {Boolean} data.IsFraudProfile
     * @param {Number} data.FraudProfileThreshold
     * @param {Boolean} data.IsTrueSample
     * @param {Number} data.QuotaCalculationTypeID
     * @param {Number} data.SurveyPlatformID
     * @param {Number} data.BidLengthOfInterview
     * @param {Number} data.BusinessUnitID
     * @param {Number} [data.SampleTypeID]
     * @param {Number} [data.BidIncidence]
     * @param {Boolean} [data.CollectsPII]
     * @return {XWikiSDK.Request}
     */
    updateSurvey(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/Surveys/Update/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getSurvey(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/Surveys/BySurveyNumber/${SurveyNumber}`);
    }

    /**
     *
     * @param {Number} SurveyStatus
     * @return {*}
     */
    getSurveysByStatus(SurveyStatus) {
        if (!SurveyStatus) {
            throw new Error('`SurveyStatus` argument is required');
        }

        return this._request(`/Demand/v1/Surveys/BySurveyStatus/${SurveyStatus}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String[]} ResponseIDs
     * @return {*}
     */
    reconcileSurvey(SurveyNumber, ResponseIDs) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!Array.isArray(ResponseIDs)) {
            throw new Error('`ResponseIDs` argument is required and should be an flat array of strings');
        }

        return this._request(`/Demand/v1/Surveys/Reconcile/${SurveyNumber}`)
            .setMethod('POST')
            .setBody({ResponseIDs});
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.Name
     * @param {Number} data.QuestionID
     * @param {String} data.LogicalOperator
     * @param {Number} data.NumberOfRequiredConditions
     * @param {String} data.IsActive
     * @param {String[]} data.PreCodes
     * @param {Number} data.Order
     * @return {*}
     */
    createQualification(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQualifications/Create/${SurveyNumber}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.Name
     * @param {Number} data.QuestionID
     * @param {String} data.LogicalOperator
     * @param {Number} data.NumberOfRequiredConditions
     * @param {String} data.IsActive
     * @param {String[]} data.PreCodes
     * @param {Number} data.Order
     * @return {*}
     */
    updateQualification(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQualifications/Update/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getDemandQualifications(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQualifications/BySurveyNumber/${SurveyNumber}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.Name
     * @param {Number} data.FieldTarget
     * @param {Number} data.Quota
     * @param {Boolean} data.IsActive
     * @param {String} [data.SurveyQuotaType]
     * @param {Object[]} data.Conditions
     * @return {*}
     */
    createQuota(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQuotas/Create/${SurveyNumber}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.Name
     * @param {Number} data.FieldTarget
     * @param {Number} data.Quota
     * @param {Boolean} data.IsActive
     * @param {String} [data.SurveyQuotaType]
     * @param {Object[]} data.Conditions
     * @return {*}
     */
    updateQuota(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQuotas/Update/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getDemandQuotas(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQuotas/BySurveyNumber/${SurveyNumber}`);
    }

    getExchangeTemplates() {
        return this._request(`/Demand/v1/ExchangeTemplates/GetAll`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Number} ExchangeTemplateID
     * @return {*}
     */
    applyExchangeTemplate(SurveyNumber, ExchangeTemplateID) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!ExchangeTemplateID) {
            throw new Error('`ExchangeTemplateID` argument is required');
        }

        return this._request(`/Demand/v1/ExchangeTemplates/ApplyToSurvey/${SurveyNumber}/${ExchangeTemplateID}`)
            .setMethod('POST');
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {Number} data.SurveyNumber
     * @param {String} data.Name
     * @param {Number} data.AllocationPercentage
     * @param {Boolean} data.IsHedgeAccess
     * @param {Object[]} data.Suppliers
     * @param {Number} [data.CPI]
     * @return {*}
     */
    createGroup(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/CreateWithSuppliers/${SurveyNumber}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {Number} data.SurveyNumber
     * @param {String} data.Name
     * @param {Number} data.AllocationPercentage
     * @param {Boolean} [data.IsHedgeAccess]
     * @param {Number} [data.CPI]
     * @return {*}
     */
    createEmptyGroup(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/Create/${SurveyNumber}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {Number} data.SurveyNumber
     * @param {String} data.Name
     * @param {Number} data.AllocationPercentage
     * @param {Boolean} data.IsHedgeAccess
     * @param {Number} [data.CPI]
     * @return {*}
     */
    updateGroup(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/Update/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Number} SupplierGroupID
     * @return {*}
     */
    deleteGroup(SurveyNumber, SupplierGroupID) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierGroupID) {
            throw new Error('`SupplierGroupID` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/Delete/${SurveyNumber}/${SupplierGroupID}`)
            .setMethod('DELETE');
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Number} SupplierGroupID
     * @param {Number|String} SupplierCode
     * @return {*}
     */
    addToGroup(SurveyNumber, SupplierGroupID, SupplierCode) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierGroupID) {
            throw new Error('`SupplierGroupID` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/AddSuppliersToGroup/${SurveyNumber}/${SupplierGroupID}`)
            .setMethod('POST')
            .setBody({SupplierCode});
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Number|String} SupplierCode
     * @return {*}
     */
    removeFromGroup(SurveyNumber, SupplierCode) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/RemoveSuppliersFromGroup/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody({SupplierCode});
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getGroups(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierGroups/BySurveyNumber/${SurveyNumber}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @return {*}
     */
    getAllocations(SurveyNumber) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierAllocations/BySurveyNumber/${SurveyNumber}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.SupplierCode
     * @param {Number} [data.AllocationPercentage]
     * @param {Number} data.TCPI
     * @param {Boolean} [data.HedgeAccess]
     * @param {String} [data.BlockRouterTraffic]
     * @return {*}
     */
    createAllocation(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierAllocations/Create/${SurveyNumber}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {Object} data
     * @param {String} data.SupplierCode
     * @param {Number} [data.AllocationPercentage]
     * @param {Number} data.TCPI
     * @param {Boolean} [data.HedgeAccess]
     * @param {String} [data.BlockRouterTraffic]
     * @return {*}
     */
    updateAllocation(SurveyNumber, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SupplierAllocations/Update/${SurveyNumber}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    deleteAllocation(SurveyNumber, SupplierCode) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Demand/v1/SupplierAllocations/Delete/${SurveyNumber}/${SupplierCode}`)
            .setMethod('DELETE');
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @param {Object} data
     * @param {Number} data.SupplierLinkTypeCode
     * @param {String} data.TrackingTypeCode
     * @return {*}
     */
    createNonExchangeLink(SurveyNumber, SupplierCode, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (LucidSDK.trackingCodeTypes.indexOf(data.TrackingTypeCode) === -1) {
            throw new Error('`data.TrackingTypeCode` should be one of: ' + LucidSDK.trackingCodeTypes.join(','));
        }

        return this._request(`/Demand/v1/SupplierAllocations/Targets/Create/${SurveyNumber}/${SupplierCode}`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @param {Object} data
     * @param {Number} data.SupplierLinkTypeCode
     * @param {String} data.TrackingTypeCode
     * @param {String} data.DefaultLink
     * @param {String} data.SuccessLink
     * @param {String} data.FailureLink
     * @param {String} data.OverQuotaLink
     * @param {String} data.QualityTerminationLink
     * @return {*}
     */
    updateNonExchangeLink(SurveyNumber, SupplierCode, data) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (LucidSDK.trackingCodeTypes.indexOf(data.TrackingTypeCode) === -1) {
            throw new Error('`data.TrackingTypeCode` should be one of: ' + LucidSDK.trackingCodeTypes.join(','));
        }

        return this._request(`/Demand/v1/SupplierAllocations/Targets/Update/${SurveyNumber}/${SupplierCode}`)
            .setMethod('PUT')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    deleteNonExchangeLink(SurveyNumber, SupplierCode) {
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }

        return this._request(`/Demand/v1/SupplierAllocations/Targets/Delete/${SurveyNumber}/${SupplierCode}`)
            .setMethod('DELETE');
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.CountryLanguageID
     * @param {Number} data.LengthofInterview
     * @param {Number} data.Incidence
     * @param {Number} data.Price
     * @param {Object[]} data.Quotas
     * @param {Number} [data.QuestionID]
     * @param {Number} [data.PreCodes]
     * @return {*}
     */
    getTimeToCompletion(data) {
        return this._request(`/Demand/v1/Feasibility/Time`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.CountryLanguageID
     * @param {Number} data.LengthofInterview
     * @param {Number} data.Incidence
     * @param {Object[]} data.Quotas
     * @param {Number} [data.QuestionID]
     * @param {Number} [data.PreCodes]
     * @return {*}
     */
    getPrice(data) {
        return this._request(`/Demand/v1/Feasibility/Price`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.CountryLanguageID
     * @param {Number} data.LengthofInterview
     * @param {Number} data.Incidence
     * @param {Number} data.Price
     * @param {Object[]} data.Quotas
     * @param {Number} [data.QuestionID]
     * @param {Number} [data.PreCodes]
     * @return {*}
     */
    getCompletesPerDay(data) {
        return this._request(`/Demand/v1/Feasibility/NumberOfRespondents`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @return {*}
     */
    getDemandQualifiedRespondents(SurveyNumber, SupplierCode) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQualifiedRespondents/BySurveyNumberSupplierCode/${SurveyNumber}/${SupplierCode}`);
    }

    /**
     *
     * @param {Number} SurveyNumber
     * @param {String|Number} SupplierCode
     * @param {Object[]} SurveyQualifiedRespondents
     * @return {*}
     */
    uodateQualifiedRespondents(SurveyNumber, SupplierCode, SurveyQualifiedRespondents) {
        if (!SupplierCode) {
            throw new Error('`SupplierCode` argument is required');
        }
        if (!SurveyNumber) {
            throw new Error('`SurveyNumber` argument is required');
        }

        return this._request(`/Demand/v1/SurveyQualifiedRespondents/Update/${SurveyNumber}/${SupplierCode}`)
            .setMethod('PUT')
            .setBody([SurveyQualifiedRespondents]);
    }

    getDemandSurveyGroups() {
        return this._request(`/Demand/v1/SurveyGroups`);
    }

    /**
     *
     * @param {Number} SurveyGroupID
     * @return {*}
     */
    getDemandSurveyGroup(SurveyGroupID) {
        if (!SurveyGroupID) {
            throw new Error('`SurveyGroupID` argument is required');
        }

        return this._request(`/Demand/v1/SurveyGroups/${SurveyGroupID}`);
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.Name
     * @return {*}
     */
    createDemandSurveyGroup(data) {
        return this._request(`/Demand/v1/SurveyGroups`)
            .setMethod('POST')
            .setBody(data);
    }

    /**
     *
     * @param {Number} SurveyGroupID
     * @param {Number[]|String[]} SurveyIDs
     * @return {*}
     */
    addDemandSurveysToGroup(SurveyGroupID, SurveyIDs) {
        if (!SurveyGroupID) {
            throw new Error('`SurveyGroupID` argument is required');
        }

        return this._request(`/Demand/v1/SurveyGroups/${SurveyGroupID}`)
            .setMethod('POST')
            .setBody([SurveyIDs]);
    }

    /**
     *
     * @param {Number} SurveyGroupID
     * @param {Number[]|String[]} SurveyIDs
     * @return {*}
     */
    updateDemandSurveyGroup(SurveyGroupID, SurveyIDs) {
        if (!SurveyGroupID) {
            throw new Error('`SurveyGroupID` argument is required');
        }

        return this._request(`/Demand/v1/SurveyGroups/${SurveyGroupID}`)
            .setMethod('PUT')
            .setBody([SurveyIDs]);
    }

    /**
     *
     * @param {Number} SurveyGroupID
     * @param {Number[]|String[]} SurveyIDs
     * @return {*}
     */
    deleteFromDemandSurveyGroup(SurveyGroupID, SurveyIDs) {
        if (!SurveyGroupID) {
            throw new Error('`SurveyGroupID` argument is required');
        }

        return this._request(`/Demand/v1/SurveyGroups/${SurveyGroupID}`)
            .setMethod('DELETE')
            .setBody([SurveyIDs]);
    }

    _request(url) {
        return new Request(url, this);
    }
}

LucidSDK.Errors = Errors;
LucidSDK.defaultBundles = ['CountryLanguages', 'Industries', 'SampleTypes', 'StudyTypes', 'SupplierLinkTypes', 'SurveyStatuses'];
LucidSDK.environments = {
    'sandbox': 'https://stg-api.samplicio.us/',
    'production': 'https://api.samplicio.us/',
};
LucidSDK.trackingCodeTypes = ['NONE', 'PIXEL', 'S2S'];

module.exports = LucidSDK;
