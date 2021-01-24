const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productDetailsSchema = new Schema({
  data: {
    productDetails: {
      gas: {
        medium: String,
        tariff: String,
        supplier: String,
        tariffType: String,
        paymentMethod: String,
        standingCharge: Number,
        onlineDiscount: Number,
        from: Date,
        dualFuelDiscount: Number,
        annualConsumption: String,
        annualCost: Number,
        tcr: String,
        exitFees: Number,
        unitRates: {
          Standard: Number,
          Day: Number,
          Night: Number,
          Peak: Number,
          __typename: String,
        },
        tariffEndsOn: String,
        priceGuaranteedUntil: String,
        isEconomy7: Boolean,
        code: String,
        isSmartPayg: Boolean,
        meterGenerationType: String,
        __typename: String,
      },
      electricity: {
        medium: String,
        tariff: String,
        supplier: String,
        tariffType: String,
        paymentMethod: String,
        standingCharge: Number,
        onlineDiscount: Number,
        from: String,
        dualFuelDiscount: Number,
        annualConsumption: String,
        annualCost: Number,
        tcr: String,
        exitFees: Number,
        unitRates: {
          Standard: Number,
          Day: String,
          Night: String,
          Peak: String,
          __typename: String,
        },
        tariffEndsOn: String,
        priceGuaranteedUntil: String,
        isEconomy7: Boolean,
        code: String,
        isSmartPayg: Boolean,
        meterGenerationType: String,
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
          gas: { cost: String, __typename: String },
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
      to: String,
      balance: Number,
      pendingBalance: Number,
      maxTopupAmount: Number,
      switchStatus: String,
      billingAddress: {
        name: String,
        careOf: String,
        address: String,
        town: String,
        postcode: String,
        __typename: String,
      },
      address: {
        name: String,
        careOf: String,
        address: String,
        town: String,
        postcode: String,
        __typename: String,
      },
      prepay: String,
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
        startDate: String,
        __typename: String,
      },
      inRangeOfSmartInstaller: Boolean,
      productDetails: {
        gas: {
          medium: String,
          tariff: String,
          supplier: String,
          tariffType: String,
          paymentMethod: String,
          standingCharge: Number,
          onlineDiscount: Number,
          from: String,
          dualFuelDiscount: Number,
          annualConsumption: String,
          annualCost: Number,
          tcr: String,
          exitFees: Number,
          unitRates: {
            Standard: Number,
            Day: String,
            Night: String,
            Peak: String,
            __typename: String,
          },
          tariffEndsOn: String,
          priceGuaranteedUntil: String,
          isEconomy7: Boolean,
          code: String,
          isSmartPayg: Boolean,
          meterGenerationType: String,
          __typename: String,
        },
        electricity: {
          medium: String,
          tariff: String,
          supplier: String,
          tariffType: String,
          paymentMethod: String,
          standingCharge: Number,
          onlineDiscount: Number,
          from: String,
          dualFuelDiscount: Number,
          annualConsumption: String,
          annualCost: Number,
          tcr: String,
          exitFees: Number,
          unitRates: {
            Standard: Number,
            Day: String,
            Night: String,
            Peak: String,
            __typename: String,
          },
          tariffEndsOn: String,
          priceGuaranteedUntil: String,
          isEconomy7: Boolean,
          code: String,
          isSmartPayg: Boolean,
          meterGenerationType: String,
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

module.exports = Energy;
