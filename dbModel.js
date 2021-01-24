const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productDetailsSchema = new Schema({
  data: {
    productDetails: {
      gas: {
        medium: String,
        tariff: String,
        supplier: String,
        tariffType: null,
        paymentMethod: String,
        standingCharge: Number,
        onlineDiscount: Number,
        from: Date,
        dualFuelDiscount: Number,
        annualConsumption: String,
        annualCost: Number,
        tcr: null,
        exitFees: Number,
        unitRates: {
          Standard: Number,
          Day: null,
          Night: null,
          Peak: null,
          __typename: String,
        },
        tariffEndsOn: null,
        priceGuaranteedUntil: null,
        isEconomy7: Boolean,
        code: String,
        isSmartPayg: Boolean,
        meterGenerationType: null,
        __typename: String,
      },
      electricity: {
        medium: String,
        tariff: String,
        supplier: String,
        tariffType: null,
        paymentMethod: String,
        standingCharge: Number,
        onlineDiscount: Number,
        from: String,
        dualFuelDiscount: Number,
        annualConsumption: String,
        annualCost: Number,
        tcr: null,
        exitFees: Number,
        unitRates: {
          Standard: Number,
          Day: null,
          Night: null,
          Peak: null,
          __typename: String,
        },
        tariffEndsOn: null,
        priceGuaranteedUntil: null,
        isEconomy7: Boolean,
        code: String,
        isSmartPayg: Boolean,
        meterGenerationType: null,
        __typename: String,
      },
      __typename: String,
    },
  },
});

const usageDataSchema = new Schema({
  data: {
    usageData: [
      {
        date: String,
        usage: {
          gas: { cost: null, __typename: String },
          electricity: {
            cost: Number,
            rates: [
              {
                cost: Number,
                name: String,
                __typename: String,
              },
            ],
            __typename: String,
          },
          __typename: String,
        },
        __typename: String,
      },
    ],
  },
});

const meterPointsSchema = new Schema({
  data: {
    meterpoints: [
      {
        from: String,
        id: Number,
        technicalDetailsDate: String,
        type: String,
        smart: Boolean,
        canAcceptReadings: Boolean,
        __typename: String,
        readings: [
          {
            cumulative: Number,
            meter: String,
            register: String,
            quality: String,
            readingDate: String,
            source: String,
            unit: String,
            __typename: String,
          },
        ],
      },
    ],
  },
});

const accountSchema = new Schema({
  data: {
    account: {
      id: Number,
      type: String,
      name: String,
      number: String,
      currency: String,
      from: String,
      to: null,
      balance: Number,
      pendingBalance: Number,
      maxTopupAmount: Number,
      switchStatus: String,
      billingAddress: {
        name: String,
        careOf: null,
        address: String,
        town: String,
        postcode: String,
        __typename: String,
      },
      address: {
        name: String,
        careOf: null,
        address: String,
        town: String,
        postcode: String,
        __typename: String,
      },
      prepay: null,
      meterOverview: [
        {
          meterpointId: Number,
          meterpointIdentifier: String,
          fuel: String,
          smart: Boolean,
          smartVersion: String,
          fromDt: String,
          canAcceptReadings: Boolean,
          supplyStatus: String,
          operationType: String,
          meterPointServiceType: String,
          gridSupplyGroup: String,
          __typename: String,
        },
      ],
      status: String,
      lossStatus: {
        activeLoss: Boolean,
        objected: Boolean,
        startDate: null,
        __typename: String,
      },
      inRangeOfSmartInstaller: Boolean,
      productDetails: {
        gas: {
          medium: String,
          tariff: String,
          supplier: String,
          tariffType: null,
          paymentMethod: String,
          standingCharge: Number,
          onlineDiscount: Number,
          from: String,
          dualFuelDiscount: Number,
          annualConsumption: String,
          annualCost: Number,
          tcr: null,
          exitFees: Number,
          unitRates: {
            Standard: Number,
            Day: null,
            Night: null,
            Peak: null,
            __typename: String,
          },
          tariffEndsOn: null,
          priceGuaranteedUntil: null,
          isEconomy7: Boolean,
          code: String,
          isSmartPayg: Boolean,
          meterGenerationType: null,
          __typename: String,
        },
        electricity: {
          medium: String,
          tariff: String,
          supplier: String,
          tariffType: null,
          paymentMethod: String,
          standingCharge: Number,
          onlineDiscount: Number,
          from: String,
          dualFuelDiscount: Number,
          annualConsumption: String,
          annualCost: Number,
          tcr: null,
          exitFees: Number,
          unitRates: {
            Standard: Number,
            Day: null,
            Night: null,
            Peak: null,
            __typename: String,
          },
          tariffEndsOn: null,
          priceGuaranteedUntil: null,
          isEconomy7: Boolean,
          code: String,
          isSmartPayg: Boolean,
          meterGenerationType: null,
          __typename: String,
        },
        __typename: String,
      },
      __typename: String,
    },
  },
});

const EnergySchema = new Schema({
  productDetails: productDetailsSchema,
  usageData: usageDataSchema,
  meterPoints: meterPointsSchema,
  account: accountSchema,
});

const Energy = model("Energy", EnergySchema);

export default Energy;
