require("dotenv").config();
const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Energy = require("./dbModel");

const app = express();

// parse application/json
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());

app.route("/").post(async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (req.body.input === process.env.SECRET) {
      const data = await getData();
      if (!data.error) {
        const obj = {
          productDetails: data[0].data.productDetails,
          usageData: data[1].data.usageData,
          meterPoints: data[2].data.meterpoints,
          account: data[3].data.account,
          dateModified: new Date().toISOString(),
        };
        const error =
          obj.productDetails.errors ||
          obj.usageData.errors ||
          obj.meterPoints.errors ||
          obj.account.errors;
        if (error) {
          return res.json({
            verified: true,
            error,
            text: "Failed to query Bulb",
            name: "Shaun Hamilton",
          });
        }
        await Energy.create([obj]);
        return res.json({
          verified: true,
          name: "Shaun Hamilton",
          obj,
        });
      } else {
        console.error("Fetch ERR: ", data.error);
        return res.json({
          verified: true,
          error: data.error,
          name: "Shaun Hamilton",
          text: "Failed to fetch data",
        });
      }
    }
    res.json({ verified: false, error: "Invalid Login" });
  } catch (err) {
    console.log("ERR", err);
    res.json({ verified: false, text: "Server Error", error: err });
  }
});

app.route("/getData").get(async (req, res) => {
  const data = await fetchFromDB();
  return res.json(data);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

const query = [
  {
    query: `query ProductDetails($accountId: Int!) {
        productDetails(accountId: $accountId) {
          gas {
            ...productFragment
            __typename
          }
          electricity {
              ...productFragment
              __typename
          }
              __typename
        }
      }
    
      fragment productFragment on Product {
        medium
        standingCharge
        onlineDiscount
        from
        dualFuelDiscount
        annualConsumption
        annualCost
        tcr
        exitFees
        unitRates {
          Standard
          Day
          Night
          Peak
          __typename
        }
        tariffEndsOn
        priceGuaranteedUntil
        isEconomy7
        code
      isSmartPayg
      meterGenerationType
      __typename
      }`,
    variables: { accountId: process.env.ACCOUNT_ID },
    operationName: "ProductDetails",
  },
  {
    query: `query usageData($accountId: Int!) {
        usageData(accountId: $accountId) {
        ...usageDataFragement
        __typename
        }
        }

        fragment usageDataFragement on UsageData {
        date
        usage {
        gas {
        cost
        __typename
        }
        electricity {
        cost
        rates {
        cost
        name
        __typename
        }
        __typename
        }
        __typename
        }
        __typename
        }`,
    variables: { accountId: process.env.ACCOUNT_ID },
    operationName: "usageData",
  },
  {
    query: `query usagePageData($accountId: Int!) {
            meterpoints(accountId: $accountId) {
              ...meterpointFragment
              readings {
                ...meterReadingFragment
                __typename
              }
              __typename
            }
          }

          fragment meterpointFragment on Meterpoint {
            from
            technicalDetailsDate
            type
            smart
            canAcceptReadings
            __typename
          }

          fragment meterReadingFragment on MeterReading {
            cumulative
            register
            quality
            readingDate
            source
            unit
            __typename
          }`,
    variables: { accountId: process.env.ACCOUNT_ID },
    operationName: "usagePageData",
  },
  {
    query: `query Accounts($id: Int!) {
              account(id: $id) {
                ...accountFragment
                __typename
              }
            }

            fragment accountFragment on Account {
              currency
              balance
              pendingBalance
              inRangeOfSmartInstaller
            __typename
          }
          `,
    variables: { id: process.env.ACCOUNT_ID },
    operationName: "Accounts",
  },
];

async function fetchFromDB() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let data;
    await Energy.find({}, (err, docs) => {
      if (err) {
        data = { error: err };
        return;
      }
      docs.sort((a, b) => {
        if (a.dateModified > b.dateModified) {
          return -1;
        } else {
          return 1;
        }
      });
      data = docs[0];
      return data;
    });
    return data;
  } catch (err) {
    return { error: "Database Error" };
  }
}

// async function testGetData() {
//   const testQuery = [
//     {
//       query: `query usageData($accountId: Int!) {
//         usageData(accountId: $accountId) {
//         ...usageDataFragement
//         __typename
//         }
//         }

//         fragment usageDataFragement on UsageData {
//         date
//         usage {
//         gas {
//         cost
//         __typename
//         }
//         electricity {
//         cost
//         rates {
//         cost
//         name
//         __typename
//         }
//         __typename
//         }
//         __typename
//         }
//         __typename
//         }`,
//       variables: { accountId: process.env.ACCOUNT_ID },
//       operationName: "usageData",
//     },
//   ];
//   try {
//     const res = await fetch("https://account.bulb.co.uk/graphql", {
//       headers: {
//         accept: "*/*",
//         authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//         "cache-control": "no-cache",
//         "content-type": "application/json",
//         pragma: "no-cache",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-bulb-session": process.env.BULB_SESSION,
//         "x-csrf-token": process.env.CSRF_TOKEN,
//       },
//       referrer: "https://account.bulb.co.uk/dashboard/usage",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: JSON.stringify(testQuery),
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     });

//     const data = await res.json();
//     // console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//     return { error: err };
//   }
// }

async function getData() {
  try {
    const res = await fetch("https://account.bulb.co.uk/graphql", {
      headers: {
        accept: "*/*",
        authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-bulb-session": process.env.BULB_SESSION,
        "x-csrf-token": process.env.CSRF_TOKEN,
      },
      referrer: "https://account.bulb.co.uk/dashboard/usage",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(query),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}
