const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productDetailsSchema = new Schema({
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
    isSmartPayg: Boolean,
    meterGenerationType: String,
    __typename: String,
  },
  __typename: String,
});

const usageDataSchema = new Schema({
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
});

const meterPointsSchema = new Schema({
  from: String,
  technicalDetailsDate: String,
  type: String,
  smart: Boolean,
  canAcceptReadings: Boolean,
  __typename: String,
  readings: [
    {
      cumulative: Number,
      register: String,
      quality: String,
      readingDate: String,
      source: String,
      unit: String,
      __typename: String,
    },
  ],
});

const accountSchema = new Schema({
  currency: String,
  balance: Number,
  pendingBalance: Number,
  inRangeOfSmartInstaller: Boolean,
  __typename: String,
});

const EnergySchema = new Schema({
  productDetails: productDetailsSchema,
  usageData: [usageDataSchema],
  meterPoints: [meterPointsSchema],
  account: accountSchema,
  dateModified: Date,
});

const Energy = model("Energy", EnergySchema);

module.exports = Energy;
