import Cookies from "js-cookie";
import cookie from "cookie";
import { format } from "date-fns";
import { API_DATE_FORMAT } from "../constants";

export const debounce = (cb, timeout) => {
    let timer;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb();
        }, timeout);
    };
};

export const throttle = (cb, timeout) => {
    let timer;
    return () => {
        if (timer) return;
        timer = setTimeout(() => {
            cb();
            timer = undefined;
        }, timeout);
    };
};

export const filterObject = (raw, allowed) => {
    return Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
        }, {});
};

export const formatApiResponse = (data) => {
    return data.substring(1, data.length - 1).split(",").reduce((body, property) => {
        const propertyKeyValue = property.split("=");
        body[propertyKeyValue[0].trim()] = propertyKeyValue[1];
        return body;
    }, {});
};

export const setCookie = (key, data, expiry = 1 / 48) => {
    Cookies.remove(key);
    Cookies.set(key, data, { expires: expiry, path: "/" });
};

export const parseCookies = (req) => cookie.parse(
    req ? req.headers.cookie || "" : ""
);

export const safeJsonParse = (str) => {
    if (typeof str !== "string") return [true];
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        if (type === "[object Object]" || type === "[object Array]") {
            return [false, JSON.parse(str)];
        }
        return [true];
    } catch (err) {
        return [err];
    }
};

export const formatDateForAPI = (date) => `${format(date, API_DATE_FORMAT)}[Asia/Calcutta]`;
