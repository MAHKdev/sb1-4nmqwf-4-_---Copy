import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "capital M", //Algorithmic Managed Accounts
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Algorithmic Managed Accounts for Investors entering the AI-era. Proprietary strategies enable emotion-less trades, minimum risk by maximum yield",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "capitalm.tech",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "c682a483-f43d-4857-b52e-4bea428a2a25",
    // Hide Crisp by default, except on route "/". Crisp is toggled with  <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        isActive: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Q8fI0CWpLbA73iBm7NkZkIz"
            : "price_1Q8fKICWpLbA73iBAujncqHg",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "TRADER",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Signals + DIY",
        // The price you want to display, the one user will be charged on Stripe.
        price: 99,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: '',
        features: [
          { name: "Pro Signals" },
          { name: "Position Setup" },
          { name: "Broker Integration" },
          { name: "Dynamic Leverage" },
          { name: "Cost Averaging (DCA)" },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isActive: true,
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Q8fIECWpLbA73iBPZRElxTi"
            : "price_1Q8fKHCWpLbA73iB7xmJ2IFa",
        name: "PENSION",
        description: "Managed Fund",
        price: 119,
        priceAnchor: 149,
        features: [
          { name: "Algorithmic Managed" },
          { name: "Fully Managed" },
          { name: "Dividends" },
          { name: "Deposits" },
        ],
      },
      {
        isActive: true,
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Q8fIRCWpLbA73iBhw9VwMpv"
            : "price_1Q8fKECWpLbA73iB9sHIs8kt",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "INVESTOR",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Individual Account",
        // The price you want to display, the one user will be charged on Stripe.
        price: 149,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 199,
        features: [
          { name: "Dedicated Broker & Banking Accounts" },
        ],
      },
    ],
    standardCouponId:
      process.env.NODE_ENV === "development"
        ? "EG54kKxQ"  //TEST Stripe Coupon
        : "nuPlHPRV", //LIVE Stripe Coupon
    //using a standard Coupon that for each checkout session is applied. Needs to be added in stripe/product catalogue/coupons
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mail",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `capital M <noreply@capitalm.tech>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Marc at capital M <info@capitalm.tech>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@capitalm.tech",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "replytonoreply@capitalm.tech",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    //main: '#00b7ff',
    main: themes.dark["primary"] || "#00b7ff",
    // OPTIONAL — The color of the loading bar (Chrome tab, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
