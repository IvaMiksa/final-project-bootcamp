export const themes = {
    colors: {
        blueDark: "#266a88",
        blue: "#0F5D82",
        blueLight: "#87A8B7",
        white: "#FFFFFF",
        whiteDark: "#FAFAFA",
        black: "#131312",
        blackLight: "#333333",
        gray: "#555555",
        grayLight: "#EBEBEB80",
        red: "#F00000",
        redDark: "#D80000",
        green: "#1DB233",
        greenDark: "#18992C",
        yellow: "#FFCC00",
    },

    fontSizes: {
        xs2: "10px",
        xs1: "12px",
        xs: "14px",
        base: "16px",
        sm: "18px",
        md: "20px", // 20px
        lg: "24px", // 24px
        xl: "clamp(1.375rem, 1.2308rem + 0.5769vw, 1.75rem)", // 28px
        xl2: "clamp(1.5rem, 1.3558rem + 0.5769vw, 1.875rem)", //  30px
        xl3: "clamp(1.75rem, 1.6538rem + 0.3846vw, 2rem)", // 32px
        xl4: "clamp(1.875rem, 1.742rem + 0.4255vw, 2.125rem)", // 36px
        xl5: "clamp(2rem, 1.867rem + 0.4255vw, 2.25rem)",    // 38px
        xl6: "clamp(2.25rem, 2.117rem + 0.4255vw, 2.5rem)", // 40px
    },

    fontWeights: {
        th: "300",
        rg: "400",
        md: "500",
        bd: "700"
    },

    border: {
        light: "1px solid #ddd",
        dark: "1px solid #000"
    },

    borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "8px",
        xl: "12px",
        xl2: "16px",
        xl3: "20px",
        xl4: "25px",
        xl5: "30px",
        xl6: "35px",
        xl7: "40px",
        xl8: "45px",
        xl9: "50px",
    },

    spaces: {
        xs2: "2px",
        xs1: "1px",
        xs: "0.25rem",   // 4px
        sm: "0.5rem",    // 8px
        md: "0.75rem",   // 12px
        lg: "0.875rem",  // 14px
        base: "1rem",    // 16px
        xl: "1.125rem",  // 18px
        xl2: "1.25rem",  // 20px
        xl3: "1.375rem", // 22px
        xl4: "1.5rem",   // 24px
        xl5: "2rem",     // 32px
        xl6: "2.25rem",  // 36px
        xl7: "3rem",     // 48px
        xl8: "4rem",     // 64px
        xl9: "4.5rem",   // 72px

        big: "250px",
        bigger: "300px",
        biggest: "400px",

        biggestOfAll: "600px",
    },

    // Transitions:
    transition: {
        short: '0.1s',
        normal: '0.3s',
        long: '0.8s',
    },

    boxShadow: {
        darker: `0 2px 5px rgba(0, 0, 0, 0.2);`,
        dark: `0 2px 5px rgba(0, 0, 0, 0.1);`,
        light: `0px 4px 10px 3px rgb(0 0 0 / 25%)`,
        lighter: `8px 7px 15px 0px rgb(236 236 236);`,
    },

    buttonPadding: {
        base: `10px 30px`,
    },

    aspectRatio: {
        rect: "16/9",
        square: "1/1"
    }
};
