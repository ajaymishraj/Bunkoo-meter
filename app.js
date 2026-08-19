function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo
} = React;

// Responsive window width hook — updates on resize/rotation
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

// --- GROQ API INTEGRATION ---
const callGroq = async (prompt, useQualityModel = false, maxTokens = 120) => {
  if (!window.GROQ_CONFIG?.key || window.GROQ_CONFIG.key === 'YOUR_GROQ_KEY_HERE') return null;
  try {
    const model = useQualityModel ? window.GROQ_CONFIG.models.quality : window.GROQ_CONFIG.models.fast;
    const res = await fetch(window.GROQ_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.GROQ_CONFIG.key}`
      },
      body: JSON.stringify({
        model,
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.85,
        max_tokens: maxTokens
      })
    });
    if (res.status === 429) {
      // Handle rate limit gracefully in UI or suppress
      return null;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (e) {
    return null;
  }
};

// --- ICONS (Inlined for stability) ---
const Icon = ({
  children,
  className,
  size = 24,
  ...props
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, props), children);
const Icons = {
  Settings: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  Check: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  AlertCircle: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  ShieldCheck: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  AlertTriangle: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  })),
  Activity: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "22 12 18 12 15 21 9 3 6 12 2 12"
  })),
  Clock: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  Zap: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  })),
  Target: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  })),
  Calendar: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  Skull: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m11.5 13.5-3.5 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12.5 13.5 3.5 2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "9",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16.5h-8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.2 5.7a8.5 8.5 0 0 1 7.6 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 12h-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12H4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a8 8 0 0 0-8 8c0 3 1.5 5 4 6v2h8v-2c2.5-1 4-3 4-6a8 8 0 0 0-8-8z"
  })),
  BarChart2: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  })),
  ArrowUp: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "5"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "5 12 12 5 19 12"
  })),
  ArrowDown: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "19 12 12 19 5 12"
  })),
  TrendingUp: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "23 6 13.5 15.5 8.5 10.5 1 18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 6 23 6 23 12"
  })),
  TrendingDown: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "23 18 13.5 8.5 8.5 13.5 1 6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 18 23 18 23 12"
  })),
  XCircle: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })),
  CheckCircle: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  Percent: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "5",
    x2: "5",
    y2: "19"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "6.5",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "17.5",
    r: "2.5"
  })),
  ChevronLeft: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  ChevronRight: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  ArrowRight: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  })),
  RefreshCw: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "23 4 23 10 17 10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "1 20 1 14 7 14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
  })),
  Trash2: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  ArrowUpRight: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "17",
    x2: "17",
    y2: "7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 7 17 7 17 17"
  })),
  ArrowDownRight: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "7",
    x2: "17",
    y2: "17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 7 17 17 7 17"
  })),
  Bell: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.73 21a2 2 0 0 1-3.46 0"
  })),
  BellOff: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M13.73 21a2 2 0 0 1-3.46 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.63 13A17.89 17.89 0 0 1 18 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 8a6 6 0 0 0-9.33-5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  })),
  Download: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }))
};
const {
  Settings,
  Check,
  AlertCircle,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Clock,
  Zap,
  Target,
  Calendar,
  Skull,
  BarChart2,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CheckCircle,
  Bell,
  BellOff,
  Download
} = Icons;

// Users icon for Friends
Icons.Users = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "7",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M23 21v-2a4 4 0 0 0-3-3.87"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 3.13a4 4 0 0 1 0 7.75"
}));
const {
  Users
} = Icons;

// Edit2 icon (pencil) for QuickMark
Icons.Edit2 = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
}));
const {
  Edit2
} = Icons;

// --- UTILS: Storage ---
const DB_NAME = "BunkooMeterDB";
const DB_VERSION = 4;
const initDB = async () => {
  try {
    return await window.idb.openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // If stores exist but have no keyPath (from an older buggy initialization), delete them so they can be recreated correctly
        if (db.objectStoreNames.contains('settings') && !transaction.objectStore('settings').keyPath) {
          db.deleteObjectStore('settings');
        }
        if (db.objectStoreNames.contains('dailyRecords') && !transaction.objectStore('dailyRecords').keyPath) {
          db.deleteObjectStore('dailyRecords');
        }
        if (db.objectStoreNames.contains('streaks') && !transaction.objectStore('streaks').keyPath) {
          db.deleteObjectStore('streaks');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', {
            keyPath: 'key'
          });
        }
        if (!db.objectStoreNames.contains('dailyRecords')) {
          db.createObjectStore('dailyRecords', {
            keyPath: 'date'
          });
        }
        if (!db.objectStoreNames.contains('streaks')) {
          db.createObjectStore('streaks', {
            keyPath: 'key'
          });
        }
      }
    });
  } catch (e) {
    // If service worker serves old code with lower DB_VERSION, handle gracefully
    if (e.name === 'VersionError') {
      return await window.idb.openDB(DB_NAME);
    }
    throw e;
  }
};

// Migration Logic on App Load
const migrateData = async () => {
  const OLD_KEY = 'bunkoo_student_data';
  const old = localStorage.getItem(OLD_KEY);
  let migrated = false;
  const db = await initDB();

  // Migrate from old localStorage bunkoo_student_data if exists
  if (old) {
    try {
      const parsed = JSON.parse(old);
      if (parsed.settings) await db.put('settings', {
        key: 'main',
        ...parsed.settings
      });
      if (parsed.streaks) await db.put('streaks', {
        key: 'main',
        ...parsed.streaks
      });
      localStorage.removeItem(OLD_KEY);
      migrated = true;
    } catch (e) {
      console.error('Migration from localStorage had an issue:', e);
    }
  }

  // Migrate from old bunkoo_db if it exists
  try {
    const oldDbOpenReq = indexedDB.open("bunkoo_db", 1);
    oldDbOpenReq.onsuccess = async e => {
      const oldDb = e.target.result;
      if (oldDb.objectStoreNames.contains("settings")) {
        const tx = oldDb.transaction("settings", "readonly");
        const store = tx.objectStore("settings");
        const getReq = store.get("user_data");
        getReq.onsuccess = async () => {
          if (getReq.result) {
            const currentSettings = await db.get('settings', 'main');
            if (!currentSettings) {
              await db.put('settings', {
                key: 'main',
                ...getReq.result
              });
              migrated = true;
            }
          }
        };
      }
    };
  } catch (e) {
    console.error('Migration from old IndexedDB had an issue:', e);
  }
  if (migrated) {
    // Show toast is available later in UI
    console.log("Data migrated successfully");
  }
};
const saveAttendanceData = async data => {
  try {
    const db = await initDB();
    const existing = (await db.get('settings', 'main')) || {};
    // Strip function properties — IndexedDB can't clone functions
    const cleanData = {};
    for (const [k, v] of Object.entries(data)) {
      if (typeof v !== 'function') cleanData[k] = v;
    }
    await db.put('settings', {
      key: 'main',
      ...existing,
      ...cleanData
    });
  } catch (error) {
    console.warn("Storage blocked, using in-memory:", error);
  }
};
const getAttendanceData = async () => {
  try {
    const db = await initDB();
    const data = await db.get('settings', 'main');
    return data || null;
  } catch (error) {
    console.warn("Storage blocked, initializing new:", error);
    return null;
  }
};
const getDailyRecord = async dateKey => {
  try {
    const db = await initDB();
    return await db.get('dailyRecords', dateKey);
  } catch (e) {
    return null;
  }
};
const saveDailyRecord = async record => {
  try {
    const db = await initDB();
    await db.put('dailyRecords', record);
  } catch (e) {
    console.warn(e);
  }
};

// --- UTILS: Calculations ---
const calculateStats = data => {
  if (!data || typeof data !== "object") return null;
  const {
    conducted,
    attended,
    perDay,
    target
  } = data;
  if (conducted === undefined || attended === undefined) return null;
  const currentPercentage = conducted === 0 ? 0 : attended / conducted * 100;
  const totalAbsences = conducted - attended;
  const buffer = currentPercentage - target;
  let status = "safe";
  if (currentPercentage < target) status = "danger";else if (currentPercentage < target + 5) status = "caution";

  // Calculate safe bunk: How many classes can be missed while staying at or above target
  // Formula: (attended) / (conducted + X) >= target/100
  // Solving: X <= (100 * attended - target * conducted) / target
  const safeBunkFloat = target > 0 ? (100 * attended - target * conducted) / target : 0;
  const safeBunkClasses = Math.max(0, Math.floor(safeBunkFloat));
  const safeBunkDays = perDay > 0 ? Math.floor(safeBunkClasses / perDay) : 0;
  let classesToRecover = 0;
  let isImpossible = false;
  if (currentPercentage < target) {
    if (target === 100) {
      isImpossible = true;
    } else {
      const numerator = target * conducted - 100 * attended;
      const denominator = 100 - target;
      const needed = numerator / denominator;
      classesToRecover = Math.ceil(needed);
    }
    if (perDay > 0 && classesToRecover / perDay > 14) status = "critical";
  }
  const daysToRecover = perDay > 0 ? Math.ceil(classesToRecover / perDay) : 0;
  const nextPercent = Math.floor(currentPercentage) + 1;
  let classesToNextPercent = 0;
  if (nextPercent <= 100) {
    const num = nextPercent * conducted - 100 * attended;
    const den = 100 - nextPercent;
    if (den > 0) classesToNextPercent = Math.ceil(Math.max(0, num / den));
  }
  const prevPercent = Math.ceil(currentPercentage) - 1;
  let classesToDropPercent = 0;
  if (prevPercent > 0) {
    const num = 100 * attended - prevPercent * conducted;
    const den = prevPercent;
    classesToDropPercent = Math.floor(Math.max(0, num / den));
  } else {
    classesToDropPercent = 999;
  }
  const nextPercentageIfMiss = attended / (conducted + 1) * 100;
  const burnRate = Math.abs(currentPercentage - nextPercentageIfMiss);
  let stabilityScore = currentPercentage >= target ? Math.min(100, 50 + buffer * 2) : Math.max(0, 50 - Math.abs(buffer) * 4);
  const stressIndex = Math.max(0, Math.min(100, 100 - stabilityScore));
  return {
    currentPercentage,
    totalAbsences,
    buffer,
    safeBunkClasses,
    safeBunkDays,
    classesToRecover,
    daysToRecover,
    isImpossible,
    classesToNextPercent,
    classesToDropPercent,
    burnRate,
    stabilityScore,
    stressIndex,
    status
  };
};

// --- COMPONENTS ---

const AuroraBackground = ({
  status = "safe"
}) => {
  const windowWidth = useWindowWidth();
  // Detect if device is mobile or low-end
  const isMobile = windowWidth < 768;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const getTheme = () => {
    switch (status) {
      case "danger":
      case "critical":
        return {
          bg: "#050000",
          primary: "#450a0a",
          secondary: "#7f1d1d",
          blob1: "bg-red-900/30",
          blob2: "bg-orange-900/20"
        };
      case "caution":
        return {
          bg: "#080500",
          primary: "#451a03",
          secondary: "#78350f",
          blob1: "bg-amber-900/30",
          blob2: "bg-yellow-900/20"
        };
      default:
        return {
          bg: "#020205",
          primary: "#1e1b4b",
          secondary: "#312e81",
          blob1: "bg-purple-900/30",
          blob2: "bg-blue-900/20"
        };
    }
  };
  const theme = getTheme();

  // Simplified background for mobile/reduced motion
  if (isMobile || prefersReducedMotion) {
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[-1] overflow-hidden transition-colors duration-1000",
      style: {
        backgroundColor: theme.bg
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[80px] ${theme.blob1} opacity-30`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute bottom-[10%] right-[20%] w-[70vw] h-[70vw] rounded-full blur-[100px] ${theme.blob2} opacity-20`
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[-1] overflow-hidden transition-colors duration-[2000ms]",
    style: {
      backgroundColor: theme.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-30 blur-[80px] animate-spin-slow",
    style: {
      background: `conic-gradient(from 0deg at 50% 50%, ${theme.primary} 0deg, transparent 60deg, ${theme.secondary} 120deg, transparent 180deg, ${theme.primary} 240deg, transparent 300deg, ${theme.secondary} 360deg)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute top-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full blur-[80px] animate-blob-1 ${theme.blob1}`
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-blob-2 ${theme.blob2}`
  }));
};
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-zinc-100",
  delay = 0,
  highlight = false,
  description
}) => {
  const windowWidth = useWindowWidth();
  return /*#__PURE__*/React.createElement("div", {
    className: `relative overflow-hidden p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl bg-[#09090b]/80 border ${highlight ? "border-purple-500/30" : "border-white/5"} backdrop-blur-sm hover:border-purple-500/30 transition-colors duration-200 animate-fade-up`,
    style: {
      animationDelay: `${windowWidth < 768 ? 0 : delay * 0.15}s`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-2 sm:mb-3 md:mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 sm:gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-1 sm:p-1.5 rounded-md ${color} bg-white/5`
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 12,
    className: `${color} sm:w-3.5 sm:h-3.5`
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-zinc-400 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider"
  }, title))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col relative z-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white ${highlight ? "text-purple-100" : ""}`
  }, value), subtitle && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] sm:text-[10px] md:text-[11px] text-zinc-500 mt-0.5 sm:mt-1 font-medium tracking-wide"
  }, subtitle), description && /*#__PURE__*/React.createElement("p", {
    className: "text-[8px] sm:text-[9px] md:text-[10px] text-zinc-600 mt-2 sm:mt-3 md:mt-4 leading-relaxed font-medium"
  }, description)));
};

// --- UTILS: Spark Data Generator ---
const generateSparkData = (data, metric, days = 7) => {
  const points = [];
  let {
    conducted,
    attended,
    perDay,
    target
  } = data;
  for (let i = 0; i < days; i++) {
    const pct = conducted === 0 ? 0 : attended / conducted * 100;
    const buffer = pct - target;
    const nextPct = conducted > 0 ? attended / (conducted + 1) * 100 : 0;
    const burnRate = Math.abs(pct - nextPct);
    const stabilityScore = pct >= target ? Math.min(100, 50 + buffer * 2) : Math.max(0, 50 - Math.abs(buffer) * 4);
    const stressIndex = Math.max(0, Math.min(100, 100 - stabilityScore));
    if (metric === 'buffer') points.push(buffer);else if (metric === 'burnRate') points.push(burnRate);else if (metric === 'stress') points.push(stressIndex);else if (metric === 'percentage') points.push(pct);
    conducted += perDay;
    attended += perDay;
  }
  return points;
};

// --- VISUAL COMPONENTS ---

const Sparkline = ({
  data = [],
  color = "#10b981",
  width = 120,
  height = 32
}) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 2;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * width;
    const y = height - pad - (v - min) / range * (height - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const areaPts = `0,${height} ${pts} ${width},${height}`;
  const gradId = `sp-${color.replace('#', '')}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    className: "overflow-visible opacity-80"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gradId,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("polygon", {
    points: areaPts,
    fill: `url(#${gradId})`
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const StressGauge = ({
  value = 0
}) => {
  const windowWidth = useWindowWidth();
  const [displayVal, setDisplayVal] = useState(0);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (animated || !value) return;
    const duration = 800;
    const start = performance.now();
    const anim = now => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayVal(value * ease);
      if (p < 1) requestAnimationFrame(anim);else setAnimated(true);
    };
    requestAnimationFrame(anim);
  }, [value, animated]);
  const size = windowWidth < 400 ? 120 : windowWidth < 640 ? 140 : 170;
  const sw = Math.floor(size * 0.08);
  const r = (size - sw) / 2;
  const halfC = Math.PI * r;
  const offset = halfC - displayVal / 100 * halfC;
  const getColor = () => {
    if (displayVal <= 30) return '#10b981';
    if (displayVal <= 60) return '#f59e0b';
    return '#ef4444';
  };
  const cx = size / 2;
  const cy = size / 2;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-[#09090b] border border-white/5 rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center flex-1 w-full h-full relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3 self-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1 rounded-md text-orange-400 bg-white/5"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 12
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-wider"
  }, "Stress Index")), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size / 2 + 16,
    viewBox: `0 0 ${size} ${size / 2 + 16}`
  }, /*#__PURE__*/React.createElement("path", {
    d: `M ${sw / 2} ${cy} A ${r} ${r} 0 0 1 ${size - sw / 2} ${cy}`,
    fill: "none",
    stroke: "#1c1c1e",
    strokeWidth: sw,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: `M ${sw / 2} ${cy} A ${r} ${r} 0 0 1 ${size - sw / 2} ${cy}`,
    fill: "none",
    stroke: getColor(),
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeDasharray: halfC,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke 0.5s ease'
    }
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 8,
    textAnchor: "middle",
    fill: "white",
    fontSize: windowWidth < 640 ? "22" : "26",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif"
  }, Math.round(displayVal)), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 8,
    textAnchor: "middle",
    fill: "#71717a",
    fontSize: "9",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.1em"
  }, "OF 100")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between w-full text-[9px] text-zinc-600 px-1 -mt-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-600"
  }, "Low"), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-600"
  }, "Med"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-600"
  }, "High")));
};
const BufferBar = ({
  buffer,
  target
}) => {
  const isPositive = buffer >= 0;
  const absBuffer = Math.abs(buffer);
  const maxRange = 20;
  const fillPct = Math.min(100, absBuffer / maxRange * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-[#09090b] border border-white/5 rounded-2xl p-4 md:p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-1 rounded-md ${isPositive ? 'text-emerald-400' : 'text-red-400'} bg-white/5`
  }, /*#__PURE__*/React.createElement(Target, {
    size: 12
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-wider"
  }, "Buffer Zone")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xl sm:text-2xl md:text-3xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`
  }, isPositive ? '+' : '', buffer.toFixed(2), "%")), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-zinc-500 mb-3"
  }, isPositive ? `${absBuffer.toFixed(1)}% above` : `${absBuffer.toFixed(1)}% below`, " your ", target, "% target"), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute h-full rounded-full animate-expand ${isPositive ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-red-600 to-red-400'}`,
    style: {
      width: `${fillPct}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mt-1.5 text-[8px] text-zinc-600"
  }, /*#__PURE__*/React.createElement("span", null, "At target"), /*#__PURE__*/React.createElement("span", null, "\xB1", maxRange, "%")));
};
const AttendanceDonut = ({
  attended,
  conducted
}) => {
  const windowWidth = useWindowWidth();
  const missed = conducted - attended;
  const attendedPct = conducted > 0 ? attended / conducted * 100 : 0;
  const size = windowWidth < 640 ? 110 : 130;
  const sw = 16;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const attendedOffset = circ - attendedPct / 100 * circ;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center animate-scale-in",
    style: {
      animationDelay: '0.2s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    className: "transform -rotate-90"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: "#ef4444",
    strokeOpacity: "0.2",
    strokeWidth: sw,
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: "#10b981",
    strokeWidth: sw,
    fill: "transparent",
    strokeDasharray: circ,
    strokeDashoffset: attendedOffset,
    strokeLinecap: "round",
    style: {
      transition: 'stroke-dashoffset 0.8s ease-out'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg sm:text-xl font-bold text-white"
  }, attended), /*#__PURE__*/React.createElement("span", {
    className: "text-[8px] sm:text-[9px] text-zinc-500 uppercase"
  }, "of ", conducted))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-zinc-500"
  }, "Present (", attended, ")")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1.5 h-1.5 rounded-full bg-red-500/50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-zinc-500"
  }, "Missed (", missed, ")"))));
};
const CircularProgress = ({
  percentage,
  target,
  status
}) => {
  const windowWidth = useWindowWidth();
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const colors = useMemo(() => {
    // Dynamic color gradient based on percentage
    if (percentage >= 90) {
      return {
        stroke: "#10b981",
        glow: "#059669",
        bg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        pulse: "bg-emerald-400",
        label: "Excellent"
      };
    } else if (percentage >= 80) {
      return {
        stroke: "#3b82f6",
        glow: "#2563eb",
        bg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
        pulse: "bg-blue-400",
        label: "Good"
      };
    } else if (percentage >= 75) {
      return {
        stroke: "#fbbf24",
        glow: "#d97706",
        bg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        pulse: "bg-amber-400",
        label: "Caution"
      };
    } else if (percentage >= 65) {
      return {
        stroke: "#fb923c",
        glow: "#ea580c",
        bg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
        pulse: "bg-orange-400",
        label: "Warning"
      };
    } else {
      return {
        stroke: "#f87171",
        glow: "#dc2626",
        bg: "bg-red-500/10 text-red-300 border-red-500/20",
        pulse: "bg-red-400",
        label: "Critical"
      };
    }
  }, [percentage]);
  useEffect(() => {
    if (percentage === undefined || isNaN(percentage)) return;
    setIsAnimating(true);
    const start = displayValue;
    const end = Math.min(100, Math.max(0, percentage));
    const duration = 600; // Fast smooth update
    const startTime = performance.now();
    const animate = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + (end - start) * ease);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [percentage]);

  // Responsive sizing
  const size = windowWidth < 640 ? 220 : windowWidth < 768 ? 260 : 300;
  const strokeWidth = windowWidth < 640 ? 16 : windowWidth < 768 ? 20 : 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - displayValue / 100 * circumference;
  return /*#__PURE__*/React.createElement("div", {
    className: "relative flex flex-col items-center justify-center py-3 md:py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    className: "transform -rotate-90"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: "#18181b",
    strokeWidth: strokeWidth,
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: colors.stroke,
    strokeWidth: strokeWidth,
    fill: "transparent",
    strokeDasharray: circumference,
    strokeDashoffset: offset,
    strokeLinecap: "round",
    style: {
      transition: "stroke-dashoffset 0.5s ease-out",
      filter: windowWidth >= 768 ? `drop-shadow(0 0 8px ${colors.glow}30)` : "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center px-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white tabular-nums leading-none"
  }, displayValue.toFixed(2), /*#__PURE__*/React.createElement("span", {
    className: "text-lg sm:text-xl md:text-2xl text-zinc-500 align-top"
  }, "%")), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-zinc-500 font-semibold mt-1.5 sm:mt-2 md:mt-3"
  }, "Attendance"), percentage < target && /*#__PURE__*/React.createElement("div", {
    className: "mt-1 md:mt-2 text-[9px] sm:text-[10px] md:text-xs text-red-400 font-medium text-center"
  }, (target - percentage).toFixed(2), "% below target"))), /*#__PURE__*/React.createElement("div", {
    className: `mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full border ${colors.bg} flex items-center gap-2 shadow-lg`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${colors.pulse} ${isAnimating ? "animate-pulse" : ""}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs sm:text-sm font-bold uppercase tracking-wider"
  }, colors.label)), percentage < target && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-500/10 border border-red-500/20 max-w-xs mx-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] sm:text-xs text-red-300 text-center font-medium"
  }, "\uD83D\uDCDA Below target! Check Recovery Plan below")));
};
const InputForm = ({
  initialData,
  onSave,
  onCancel,
  isInitial
}) => {
  const [formData, setFormData] = useState(initialData || {
    conducted: 0,
    attended: 0,
    perDay: 1,
    target: 75
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        conducted: initialData.conducted ?? prev.conducted,
        attended: initialData.attended ?? prev.attended,
        perDay: initialData.perDay ?? prev.perDay,
        target: initialData.target ?? prev.target
      }));
    }
  }, [initialData?.conducted, initialData?.attended, initialData?.perDay, initialData?.target]);
  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    // Convert empty strings back to numbers for submission
    const fd = {
      ...formData,
      conducted: Number(formData.conducted) || 0,
      attended: Number(formData.attended) || 0,
      perDay: Number(formData.perDay) || 0,
      target: Number(formData.target) || 0
    };
    if (fd.attended > fd.conducted) return setError("Attended cannot exceed Conducted");
    if (fd.conducted < 0 || fd.attended < 0) return setError("Values cannot be negative");
    if (fd.perDay < 1) return setError("Classes per day must be at least 1");
    if (fd.target < 0 || fd.target > 100) return setError("Target must be between 0-100%");
    onSave(fd);
  };
  const quickActions = [{
    label: "75% Target",
    data: {
      ...formData,
      target: 75
    }
  }, {
    label: "80% Target",
    data: {
      ...formData,
      target: 80
    }
  }, {
    label: "85% Target",
    data: {
      ...formData,
      target: 85
    }
  }];

  // Onboarding hero shown only on first-time setup
  const onboardingHero = isInitial ? /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md mb-6 animate-fade-up text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-4 tracking-wide"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px'
    }
  }, "\u2726"), "Smart Attendance Tracker"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl sm:text-4xl font-black text-white mb-3 leading-tight tracking-tight"
  }, "Welcome to ", /*#__PURE__*/React.createElement("span", {
    className: "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
  }, "Bunkoo Meter")), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-400 text-sm sm:text-base leading-relaxed mb-5"
  }, "Enter your current attendance numbers once and get real-time insights \u2014 how many classes you can skip, how many you need to attend, and your stress index."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-2"
  }, [{
    icon: "🎯",
    label: "Safe bunk count"
  }, {
    icon: "📈",
    label: "Recovery planner"
  }, {
    icon: "🧠",
    label: "Stress index"
  }].map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-zinc-900/60 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, f.icon), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-zinc-400 font-medium leading-tight text-center"
  }, f.label))))) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full flex flex-col items-center"
  }, onboardingHero, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md bg-zinc-900/90 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800 shadow-2xl animate-scale-in"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-1 text-center"
  }, isInitial ? "Set Up Your Attendance" : "Edit Parameters"), isInitial && /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-500 text-xs text-center mb-6"
  }, "You can update these any time from the settings icon."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Conducted Classes"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors",
    value: formData.conducted,
    onChange: e => setFormData({
      ...formData,
      conducted: e.target.value === '' ? '' : +e.target.value
    }),
    placeholder: "Total classes held"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Attended Classes"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors",
    value: formData.attended,
    onChange: e => setFormData({
      ...formData,
      attended: e.target.value === '' ? '' : +e.target.value
    }),
    placeholder: "Classes you attended"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 justify-between block mb-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase"
  }, "Classes Per Day"), /*#__PURE__*/React.createElement("div", {
    className: "group relative"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "text-zinc-500 cursor-help",
    size: 14
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-full right-0 mb-2 w-48 p-2 bg-zinc-800 text-zinc-300 text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-white/10 text-center"
  }, "How many periods/classes are scheduled on a typical working day."))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors",
    value: formData.perDay,
    onChange: e => setFormData({
      ...formData,
      perDay: e.target.value === '' ? '' : +e.target.value
    }),
    placeholder: "6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Target %"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "100",
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors",
    value: formData.target,
    onChange: e => setFormData({
      ...formData,
      target: e.target.value === '' ? '' : +e.target.value
    }),
    placeholder: "75"
  }))), !isInitial && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Quick Targets"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, quickActions.map((action, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => setFormData(action.data),
    className: "flex-1 py-2 px-3 rounded-lg text-xs bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
  }, action.label)))), error && /*#__PURE__*/React.createElement("div", {
    className: "text-red-400 bg-red-400/10 p-3 rounded-lg text-sm flex gap-2 items-center"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    size: 16
  }), error), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-4"
  }, !isInitial && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    className: "flex-1 py-3 px-4 rounded-xl text-zinc-400 bg-zinc-800/50 hover:bg-zinc-800 transition-all"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 flex justify-center items-center gap-2 transition-all"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 18
  }), " ", isInitial ? "Start" : "Update"))), !isInitial && /*#__PURE__*/React.createElement("div", {
    className: "mt-8 space-y-6"
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "DATA MANAGEMENT"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (initialData?.onExportData) initialData.onExportData();
    },
    className: "w-full py-3 px-4 rounded-xl text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 transition-all text-sm font-semibold flex items-center justify-center gap-2"
  }, "Export Data \uD83D\uDCE6"), /*#__PURE__*/React.createElement("label", {
    className: "w-full py-3 px-4 rounded-xl text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 transition-all text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
  }, "Import Data \uD83D\uDCC2", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    className: "hidden",
    onChange: e => {
      if (e.target.files.length > 0 && initialData?.onImportData) {
        initialData.onImportData(e.target.files[0]);
      }
      e.target.value = null; // reset
    }
  }))), /*#__PURE__*/React.createElement(SectionDivider, {
    title: "DANGER ZONE"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (initialData?.onDeleteData) initialData.onDeleteData();
    },
    className: "w-full py-3 px-4 rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all text-sm font-bold flex items-center justify-center gap-2"
  }, "Delete All Data \uD83D\uDDD1\uFE0F"))), isInitial && /*#__PURE__*/React.createElement("div", {
    className: "mt-6 text-center"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs text-zinc-400 hover:text-white cursor-pointer underline decoration-zinc-600 underline-offset-4"
  }, "Restore from Backup \uD83D\uDCC2", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    className: "hidden",
    onChange: e => {
      if (e.target.files.length > 0) {
        // Wait, we need an import handler for the init screen too
        // Let's attach it to window or pass it via props
        if (window.handleImportData) {
          window.handleImportData(e.target.files[0]);
        }
      }
      e.target.value = null;
    }
  })))));
};
const GoalSeeker = ({
  data
}) => {
  const [targetGoal, setTargetGoal] = useState(data.target);
  const [result, setResult] = useState(null);
  const currentPercent = data.conducted === 0 ? 0 : data.attended / data.conducted * 100;
  useEffect(() => {
    if (Math.abs(targetGoal - currentPercent) < 0.01) return setResult({
      type: "perfect"
    });
    if (targetGoal > currentPercent) {
      const num = targetGoal * data.conducted - 100 * data.attended,
        den = 100 - targetGoal;
      if (den === 0) return setResult({
        type: "impossible"
      });
      const x = Math.ceil(num / den);
      setResult({
        type: "attend",
        count: Math.max(0, x),
        days: data.perDay > 0 ? Math.ceil(Math.max(0, x) / data.perDay) : 0
      });
    } else {
      const num = 100 * data.attended - targetGoal * data.conducted,
        den = targetGoal;
      if (den === 0) return setResult({
        type: "impossible"
      });
      const x = Math.floor(num / den);
      setResult({
        type: "miss",
        count: Math.max(0, x),
        days: data.perDay > 0 ? Math.floor(Math.max(0, x) / data.perDay) : 0
      });
    }
  }, [targetGoal, data]);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-[#09090b] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-6"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "text-blue-400",
    size: 18
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-zinc-400 uppercase tracking-wider"
  }, "Strategic Projector")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative pt-8 pb-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    step: "1",
    value: targetGoal,
    onChange: e => setTargetGoal(Number(e.target.value)),
    className: "w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-ew-resize accent-blue-500",
    style: {
      background: `linear-gradient(to right, #3b82f6 ${targetGoal}%, #27272a ${targetGoal}%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute pointer-events-none flex flex-col items-center top-0 -ml-4 transition-all duration-75",
    style: {
      left: `${targetGoal}%`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
  }, targetGoal, "%"), /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-1.5 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-blue-600"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-8 mt-4 -ml-4 flex flex-col items-center pointer-events-none transition-all duration-300",
    style: {
      left: `${currentPercent}%`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-0.5 h-3 bg-zinc-500 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] sm:text-[10px] text-zinc-500 font-bold mt-1 bg-[#09090b] px-1 rounded whitespace-nowrap"
  }, "Curr ", currentPercent.toFixed(0), "%"))), result && /*#__PURE__*/React.createElement("div", {
    className: "bg-zinc-900/50 rounded-xl p-4 border border-white/5 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-zinc-500 font-medium mb-1"
  }, "Requirement"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, result.type === "attend" && /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold text-emerald-400 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ArrowUpRight, {
    size: 20
  }), " Attend ", result.count), result.type === "miss" && /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold text-blue-400 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ArrowDownRight, {
    size: 20
  }), " Skip ", result.count), result.type === "perfect" && /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold text-zinc-300"
  }, "Maintain"), result.type === "impossible" && /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold text-red-400"
  }, "Impossible"))), result.days > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-zinc-500 font-medium mb-1 text-right"
  }, "Timeframe"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-white"
  }, "~", result.days, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-zinc-500 font-normal"
  }, "days"))))));
};
const AttendanceCalendar = ({
  data
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState(new Map()); // Map<dateKey, 'absent' | 'present'>

  const getDaysInMonth = date => ({
    days: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    firstDay: new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  });
  const {
    days,
    firstDay
  } = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  // Proper date formatting that handles leap years and DST
  const formatDateKey = (y, m, d) => {
    const date = new Date(y, m, d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const parseDate = key => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  };
  const isDayOff = date => {
    const day = date.getDay();
    return day === 0 || Boolean(data && data.saturdaysOff) && day === 6;
  };

  // Keep the reference for external updates
  useEffect(() => {
    if (data && data.onUpdateData) {
      // Nothing needed here right now, just noting
    }
  }, [data]);
  const [editingPastDate, setEditingPastDate] = useState(null);
  const [editModalValue, setEditModalValue] = useState(0);
  const [calendarRecords, setCalendarRecords] = useState({});
  const [earliestDateStr, setEarliestDateStr] = useState(null);
  const getGradientColor = pct => {
    const r = Math.round(239 + pct * (16 - 239));
    const g = Math.round(68 + pct * (185 - 68));
    const b = Math.round(68 + pct * (129 - 68));
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };
  const getGradientTextColor = pct => {
    const r = Math.round(248 + pct * (52 - 248));
    const g = Math.round(113 + pct * (211 - 113));
    const b = Math.round(113 + pct * (153 - 113));
    return `rgb(${r}, ${g}, ${b})`;
  };
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const db = await initDB();
        const records = await db.getAll('dailyRecords');
        const map = {};
        records.forEach(r => map[r.date] = r.attendedCount);
        setCalendarRecords(map);
        if (records.length > 0) {
          const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
          setEarliestDateStr(sorted[0].date);
        }
      } catch (e) {}
    };
    fetchRecords();
  }, [data, editingPastDate]);
  const toggleDate = async day => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12, 0, 0);
    const key = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);

    // Check if past date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = clickedDate.setHours(0, 0, 0, 0) < today.getTime();
    const isToday = clickedDate.getTime() === today.getTime();
    const isOffDay = isDayOff(clickedDate);

    // Today and off days are not toggled in projection planner
    if (isToday || isOffDay) return;

    // Check if before earliest start date
    let isBeforeStart = false;
    if (earliestDateStr) {
      const earliest = new Date(earliestDateStr);
      earliest.setHours(0, 0, 0, 0);
      isBeforeStart = clickedDate.getTime() < earliest.getTime();
    } else {
      isBeforeStart = isPast; // If no records exist, they haven't started yet
    }
    if (isPast) {
      if (isBeforeStart && !calendarRecords[key]) {
        if (data.onShowToast) data.onShowToast("Cannot edit dates from before you started tracking.");
        return;
      }
      // Fetch existing record to prepopulate if any
      const existingRecord = await getDailyRecord(key);
      setEditModalValue(existingRecord ? existingRecord.attendedCount : 0);
      setEditingPastDate({
        key,
        day
      });
      return;
    }
    const newMarked = new Map(markedDates);
    const currentState = newMarked.get(key);

    // 2-state toggle: first click = absent, second = present
    if (!currentState || currentState === "present") {
      newMarked.set(key, "absent");
    } else {
      newMarked.set(key, "present");
    }
    setMarkedDates(newMarked);
  };
  const simulation = useMemo(() => {
    if (markedDates.size === 0) return {
      timeline: [],
      summary: null
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find the last marked date
    const sortedKeys = Array.from(markedDates.keys()).sort();
    const lastDate = parseDate(sortedKeys[sortedKeys.length - 1]);
    let {
      conducted,
      attended
    } = data;
    const timeline = [];
    let totalDaysSimulated = 0;
    let totalAbsences = 0;
    let totalPresent = 0;

    // Iterate through each day from tomorrow to last marked date
    for (let d = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12, 0, 0); d <= lastDate; d.setDate(d.getDate() + 1)) {
      if (isDayOff(d)) continue; // Skip off days (Sundays, and Saturdays if enabled)

      const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
      const status = markedDates.get(key);

      // Only count dates that are explicitly marked
      const isAbsent = status === "absent";
      const isPresent = status === "present";
      const prevConducted = conducted;
      const prevAttended = attended;
      if (isAbsent) {
        conducted += data.perDay;
        totalAbsences++;
      } else if (isPresent) {
        conducted += data.perDay;
        attended += data.perDay;
        totalPresent++;
      }
      if (isAbsent || isPresent) {
        totalDaysSimulated++;
        const prevPercent = prevConducted > 0 ? prevAttended / prevConducted * 100 : 0;
        const currentPercent = conducted > 0 ? attended / conducted * 100 : 0;
        const change = currentPercent - prevPercent;

        // Calculate recovery metrics
        let classesNeeded = 0;
        let daysNeeded = 0;
        let safeBunkClasses = 0;
        if (currentPercent < data.target && data.target < 100) {
          const numerator = data.target * conducted - 100 * attended;
          const denominator = 100 - data.target;
          if (denominator > 0) {
            classesNeeded = Math.ceil(numerator / denominator);
            daysNeeded = data.perDay > 0 ? Math.ceil(classesNeeded / data.perDay) : 0;
          }
        } else if (currentPercent >= data.target && data.target > 0) {
          safeBunkClasses = Math.max(0, Math.floor((100 * attended - data.target * conducted) / data.target));
        }
        timeline.push({
          date: key,
          dateObj: new Date(d),
          percent: currentPercent,
          change: change,
          type: isAbsent ? "absent" : "present",
          conducted: conducted,
          attended: attended,
          classesNeeded,
          daysNeeded,
          safeBunkClasses,
          belowTarget: currentPercent < data.target
        });
      }
    }
    const finalPercent = timeline.length > 0 ? timeline[timeline.length - 1].percent : data.conducted > 0 ? data.attended / data.conducted * 100 : 0;
    const initialPercent = data.conducted > 0 ? data.attended / data.conducted * 100 : 0;
    const totalChange = finalPercent - initialPercent;
    const summary = {
      totalDays: totalDaysSimulated,
      totalAbsences,
      totalPresent,
      initialPercent,
      finalPercent,
      totalChange,
      finalConducted: conducted,
      finalAttended: attended,
      willBeAboveTarget: finalPercent >= data.target
    };
    return {
      timeline,
      summary
    };
  }, [markedDates, data]);
  const handleSavePastRecord = async () => {
    if (!editingPastDate) return;
    const {
      key
    } = editingPastDate;
    const existingRecord = await getDailyRecord(key);
    let diffAttended = editModalValue;
    let diffConducted = data.perDay;
    if (existingRecord) {
      // Already has a record: only adjust the difference
      diffAttended = editModalValue - existingRecord.attendedCount;
      diffConducted = 0; // conducted already counted
    }
    const newRecord = {
      date: key,
      attendedCount: editModalValue,
      totalCount: data.perDay,
      markedAt: Date.now()
    };
    await saveDailyRecord(newRecord);
    if (data.onUpdateData) {
      data.onUpdateData({
        ...data,
        attended: Math.max(0, data.attended + diffAttended),
        conducted: Math.max(0, data.conducted + diffConducted)
      });
    }
    setEditingPastDate(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, editingPastDate && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold text-lg mb-4"
  }, "Edit Past Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-400 text-xs mb-4"
  }, "Date: ", editingPastDate.key), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Classes attended:"), /*#__PURE__*/React.createElement("select", {
    value: editModalValue,
    onChange: e => setEditModalValue(Number(e.target.value)),
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors appearance-none"
  }, Array.from({
    length: (data.perDay || 0) + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: i
  }, i, " / ", data.perDay)))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingPastDate(null),
    className: "flex-1 py-3 px-4 rounded-xl text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 transition-all font-semibold"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: handleSavePastRecord,
    className: "flex-1 py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition-all font-bold"
  }, "Save")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 18,
    className: "text-purple-400 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-zinc-400 uppercase tracking-wider"
  }, "Smart Attendance Planner")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-300 hover:text-white cursor-pointer select-none transition-colors"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "saturdays-off-checkbox",
    checked: Boolean(data && data.saturdaysOff),
    onChange: async e => {
      const newVal = e.target.checked;
      const updated = {
        ...(data || {}),
        saturdaysOff: newVal
      };
      await saveAttendanceData(updated);
      if (data && data.onUpdateData) {
        data.onUpdateData(updated);
      }
    },
    className: "w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-zinc-900 cursor-pointer accent-purple-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap"
  }, "Saturdays Off")), markedDates.size > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setMarkedDates(new Map()),
    className: "text-xs px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition-all flex items-center justify-center gap-1.5 font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)] flex-1 sm:flex-none",
    "aria-label": "Clear all selections"
  }, /*#__PURE__*/React.createElement(RefreshCw, {
    size: 14
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap"
  }, "Clear")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 mb-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded bg-red-500/20 border border-red-500/50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-zinc-400"
  }, "Absent")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-zinc-400"
  }, "Present")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded bg-zinc-900/30 border border-zinc-700"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-zinc-400"
  }, "Off Day")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded bg-yellow-500/40 border border-yellow-500/60"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-zinc-400"
  }, "Partial"))), simulation.summary && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 animate-slide-down"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-zinc-500 uppercase mb-1"
  }, "Current"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-white"
  }, simulation.summary.initialPercent.toFixed(2), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-zinc-500 uppercase mb-1"
  }, "Projected"), /*#__PURE__*/React.createElement("p", {
    className: `text-xl font-bold ${simulation.summary.finalPercent >= data.target ? "text-emerald-400" : "text-red-400"}`
  }, simulation.summary.finalPercent.toFixed(2), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-zinc-500 uppercase mb-1"
  }, "Change"), /*#__PURE__*/React.createElement("p", {
    className: `text-xl font-bold ${simulation.summary.totalChange >= 0 ? "text-emerald-400" : "text-red-400"}`
  }, simulation.summary.totalChange >= 0 ? "+" : "", simulation.summary.totalChange.toFixed(2), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-zinc-500 uppercase mb-1"
  }, "Days Planned"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-white"
  }, simulation.summary.totalDays), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-zinc-600"
  }, simulation.summary.totalPresent, "P /", " ", simulation.summary.totalAbsences, "A"))), !simulation.summary.willBeAboveTarget && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-red-500/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-400 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 14
  }), "Warning: Projected attendance will be below target (", data.target, "%)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 bg-[#09090b] border border-white/5 rounded-2xl p-4 md:p-6 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mb-4 items-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)),
    "aria-label": "Previous month",
    className: "p-2 hover:bg-zinc-800 rounded-lg transition-colors"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    className: "text-zinc-400",
    size: 20
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-white text-sm md:text-base"
  }, currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)),
    "aria-label": "Next month",
    className: "p-2 hover:bg-zinc-800 rounded-lg transition-colors"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    className: "text-zinc-400",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-1 md:gap-2"
  }, ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "text-[10px] md:text-xs text-zinc-500 text-center py-2 font-semibold"
  }, d)), Array.from({
    length: firstDay
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: `e-${i}`
  })), Array.from({
    length: days
  }).map((_, i) => {
    const day = i + 1;
    const key = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12, 0, 0);
    const status = markedDates.get(key);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dateObj.setHours(0, 0, 0, 0) < today.getTime();
    const isToday = dateObj.getTime() === today.getTime();
    const isOffDay = isDayOff(dateObj);
    let isBeforeStart = false;
    if (earliestDateStr) {
      const e = new Date(earliestDateStr);
      e.setHours(0, 0, 0, 0);
      isBeforeStart = dateObj.getTime() < e.getTime();
    } else {
      isBeforeStart = isPast;
    }
    let className = "h-8 md:h-10 rounded-lg text-[11px] md:text-sm font-medium border transition-all duration-200 ";
    let inlineStyle = {};
    const recordAttended = calendarRecords[key];
    if (isToday) {
      // Today: show record status with special ring (non-clickable, QuickMark handles it)
      if (recordAttended !== undefined) {
        const pct = recordAttended / data.perDay;
        className += "border-purple-400 ring-2 ring-purple-400/50 shadow-lg cursor-default";
        inlineStyle.backgroundColor = getGradientColor(pct);
        inlineStyle.color = getGradientTextColor(pct);
      } else {
        className += "bg-purple-500/10 text-white border-purple-400 ring-2 ring-purple-400/50 font-bold cursor-default";
      }
    } else if (isPast) {
      if (isBeforeStart && recordAttended === undefined) {
        className += "text-zinc-700 bg-transparent border-transparent cursor-not-allowed pointer-events-none";
      } else if (recordAttended !== undefined) {
        const pct = recordAttended / data.perDay;
        className += "border border-white/5 shadow-lg cursor-pointer hover:border-white/20";
        inlineStyle.backgroundColor = getGradientColor(pct);
        inlineStyle.color = getGradientTextColor(pct);
      } else if (!isOffDay) {
        // Past unmarked working day — show warning style
        className += "text-zinc-500 border-dashed border-red-500/30 bg-red-500/5 cursor-pointer hover:bg-red-500/10 hover:text-white";
      } else {
        className += "text-zinc-600 border-zinc-700 bg-zinc-900/30 cursor-not-allowed pointer-events-none";
      }
    } else if (isOffDay) {
      className += "text-zinc-600 border-zinc-700 bg-zinc-900/30 cursor-not-allowed pointer-events-none";
    } else if (status === "absent") {
      className += "bg-red-500/20 text-red-200 border-red-500/50 hover:bg-red-500/30 cursor-pointer shadow-lg shadow-red-500/10";
    } else if (status === "present") {
      className += "bg-emerald-500/20 text-emerald-200 border-emerald-500/50 hover:bg-emerald-500/30 cursor-pointer shadow-lg shadow-emerald-500/10";
    } else {
      className += "bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800 hover:text-white border-transparent cursor-pointer hover:scale-105";
    }
    return /*#__PURE__*/React.createElement("button", {
      key: day,
      onClick: () => toggleDate(day),
      disabled: isOffDay || isToday,
      className: className,
      style: inlineStyle,
      title: isToday ? recordAttended !== undefined ? `Today: ${recordAttended}/${data.perDay} (use button above to edit)` : "Today — use the Mark button above" : isPast ? recordAttended !== undefined ? `Attended ${recordAttended}/${data.perDay} - Click to edit` : isOffDay ? dateObj.getDay() === 0 ? "Sunday - Off Day" : "Saturday - Off Day" : "⚠️ Unmarked — click to set" : isOffDay ? dateObj.getDay() === 0 ? "Sunday - Off Day" : "Saturday - Off Day" : status === "absent" ? "Planned Absent" : status === "present" ? "Planned Present" : "Click to mark"
    }, day);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "w-full lg:w-96 bg-[#09090b] border border-white/5 rounded-2xl p-4 md:p-6 max-h-[500px] overflow-y-auto custom-scrollbar"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-zinc-300 uppercase mb-4 pb-2 border-b border-white/5"
  }, "Day-by-Day Projection"), simulation.timeline.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 text-4xl"
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-600 text-xs mb-2"
  }, "Click on future dates to plan your attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-700 text-[10px]"
  }, "\uD83D\uDCA1 Tip: Click once for Absent, twice for Present")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, simulation.timeline.map((day, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `pl-4 border-l-2 ${day.type === "absent" ? "border-red-500" : "border-emerald-500"} relative animate-slide-right`,
    style: {
      animationDelay: `${i * 0.02}s`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-zinc-900/50 border border-white/5 rounded-xl p-3 hover:border-purple-500/30 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 sm:gap-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-zinc-300"
  }, day.dateObj.toLocaleDateString("default", {
    month: "short",
    day: "numeric"
  })), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] px-2 py-0.5 rounded font-medium ${day.type === "absent" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`
  }, day.type === "absent" ? "Skip" : "Attend")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-baseline gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-mono font-medium ${day.change >= 0 ? "text-emerald-500" : "text-red-500"}`
  }, day.change >= 0 ? "+" : "", day.change.toFixed(2), "%"), /*#__PURE__*/React.createElement("span", {
    className: `text-xl font-bold ${day.belowTarget ? "text-red-400" : "text-emerald-400"}`
  }, day.percent.toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-zinc-500 space-y-1 mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center bg-black/20 px-2 py-1 rounded"
  }, /*#__PURE__*/React.createElement("span", null, "Projected Value"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono"
  }, day.attended, " / ", day.conducted)), day.belowTarget && day.classesNeeded > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 pt-2 border-t border-red-500/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-red-400 font-bold mb-1"
  }, "\u26A0\uFE0F Recovery needed"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-300"
  }, "Attend ", day.classesNeeded, " more classes", day.daysNeeded > 0 && ` (~${day.daysNeeded} days)`)), !day.belowTarget && day.safeBunkClasses > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 pt-2 border-t border-emerald-500/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-400 text-[10px]"
  }, "\u2705 Safe to skip ", day.safeBunkClasses, " more classes"))))))))));
};

// --- FEATURE: Install Prompt --- (REMOVED — PWA disabled)

// --- FEATURE: Notification Manager ---
const NUDGE_MESSAGES = ["📚 Don't forget to mark today's attendance!", "🎯 Every class counts towards your target!", "💪 Stay consistent, stay above your goal!", "⚡ Quick check: How many classes today?", "🌟 Your attendance streak matters — log it!"];
const NotificationBell = ({
  data
}) => {
  const [enabled, setEnabled] = useState(() => {
    // Check if user previously enabled notifications
    return localStorage.getItem('bunkoo_notifications') === 'enabled';
  });
  const [permission, setPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'denied');
  const showNotification = (title, body) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    try {
      new Notification(title, {
        body,
        icon: './logopic.png'
      });
    } catch (e) {
      // Fallback: some browsers don't support new Notification()
      console.warn('Notification failed:', e);
    }
  };
  const handleToggle = async () => {
    if (enabled) {
      // Turn OFF
      setEnabled(false);
      localStorage.setItem('bunkoo_notifications', 'disabled');
      return;
    }

    // Turn ON
    setEnabled(true);
    localStorage.setItem('bunkoo_notifications', 'enabled');

    // Quietly request system permission if it hasn't been asked yet
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().then(res => setPermission(res));
    }

    // Show a toast to confirm (this will route to real notification if permission was just granted)
    if (data?.onShowToast) {
      data.onShowToast('🔔 Notifications Enabled!');
    } else {
      showNotification('🔔 Notifications Enabled!', 'You\'ll get attendance alerts.');
    }
  };

  // Milestone alerts when data changes
  useEffect(() => {
    if (!data || !enabled || permission !== 'granted') return;
    const stats = calculateStats(data);
    if (!stats) return;
    const lastMilestone = localStorage.getItem('bunkoo_last_milestone');
    const currentFloor = Math.floor(stats.currentPercentage);
    if (lastMilestone) {
      const prevFloor = parseInt(lastMilestone);
      // Crossed upward past a 5% milestone
      if (currentFloor >= prevFloor + 5 && currentFloor % 5 === 0) {
        showNotification(`🎉 Milestone: ${currentFloor}%!`, `Great job! Your attendance crossed ${currentFloor}%. Keep going!`);
      }
      // Approaching danger zone
      if (stats.buffer > 0 && stats.buffer <= 2 && prevFloor !== currentFloor) {
        showNotification('⚠️ Danger Zone Approaching!', `You're only ${stats.buffer.toFixed(1)}% above your target. Be careful with bunks!`);
      }
    }
    localStorage.setItem('bunkoo_last_milestone', currentFloor.toString());
  }, [data, enabled, permission]);
  const IconComp = enabled ? Bell : BellOff;
  const isDenied = permission === 'denied' && !enabled;
  return /*#__PURE__*/React.createElement("button", {
    onClick: handleToggle,
    className: `p-2 rounded-full transition-all ${enabled ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : isDenied ? 'bg-red-500/10 text-red-400 cursor-not-allowed' : 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer'}`,
    "aria-label": enabled ? 'Disable notifications' : 'Enable notifications',
    title: enabled ? 'Click to disable notifications' : isDenied ? 'Notifications blocked by browser — enable in site settings' : 'Click to enable reminders',
    disabled: isDenied
  }, /*#__PURE__*/React.createElement(IconComp, {
    size: 18
  }));
};
const SectionDivider = ({
  title,
  subtitle
}) => /*#__PURE__*/React.createElement("div", {
  className: "relative flex py-6 items-center"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex-grow border-t border-zinc-800"
}), /*#__PURE__*/React.createElement("div", {
  className: "flex flex-col items-center px-4"
}, /*#__PURE__*/React.createElement("span", {
  className: "flex-shrink-0 text-zinc-300 font-medium text-sm md:text-base"
}, title), subtitle && /*#__PURE__*/React.createElement("span", {
  className: "text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider"
}, subtitle)), /*#__PURE__*/React.createElement("div", {
  className: "flex-grow border-t border-zinc-800"
}));
const SmartTip = ({
  stats,
  target
}) => {
  if (!stats) return null;

  // If attendance is below target, the main "Action Required" alert handles the warning.
  // Hide this tip to avoid overwhelming the user with red text.
  if (stats.buffer < 0) return null;
  let config = {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    icon: "💎",
    text: "Comfortable. Safe to skip tomorrow.",
    color: "text-emerald-300"
  };
  if (stats.buffer <= 5) {
    config = {
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: "⚠️",
      text: "Be careful — every class matters this week.",
      color: "text-amber-300"
    };
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `mt-4 px-4 py-3 rounded-xl border ${config.bg} max-w-sm mx-auto flex items-start gap-3 shadow-lg animate-fade-up`,
    style: {
      animationDelay: '0.3s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, config.icon), /*#__PURE__*/React.createElement("p", {
    className: `text-xs md:text-sm font-medium ${config.color} leading-relaxed pt-0.5`
  }, config.text));
};
const TodayCard = ({
  data
}) => {
  const [record, setRecord] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayKey, setTodayKey] = useState("");
  const [isOffToday, setIsOffToday] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  useEffect(() => {
    const checkToday = async () => {
      const now = new Date();
      const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      setTodayKey(key);

      // Check if today is an off day (Sunday or Saturday when enabled)
      if (now.getDay() === 0 || Boolean(data && data.saturdaysOff) && now.getDay() === 6) {
        setIsOffToday(true);
        return;
      } else {
        setIsOffToday(false);
      }

      // Check if after 4:20 PM
      if (now.getHours() > 16 || now.getHours() === 16 && now.getMinutes() >= 20) {
        setIsClosed(true);
      }
      const existingRecord = await getDailyRecord(key);
      if (existingRecord) {
        setRecord(existingRecord);
      }
    };
    checkToday();
    const interval = setInterval(checkToday, 60000); // Check every minute for 4:20
    return () => clearInterval(interval);
  }, [data]);
  if (!data.perDay || data.perDay <= 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-[#09090b] border border-white/5 rounded-2xl p-4 mb-6 text-center shadow-lg"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-zinc-400 text-sm"
    }, "Set your classes per day in Settings to use daily marking \uD83D\uDCC5"));
  }
  if (isOffToday) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-5 mb-6 text-center shadow-lg animate-fade-in"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-blue-400 font-bold text-lg mb-1"
    }, "\uD83D\uDE34 It's a day off!"), /*#__PURE__*/React.createElement("p", {
      className: "text-blue-200/70 text-sm"
    }, "No classes today. Recharge for the week ahead."));
  }
  if (record) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-5 mb-6 shadow-lg animate-fade-in text-center relative overflow-hidden group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-2 mb-1"
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      className: "text-emerald-400",
      size: 20
    }), /*#__PURE__*/React.createElement("h3", {
      className: "text-emerald-300 font-bold text-lg"
    }, "Today Marked")), /*#__PURE__*/React.createElement("p", {
      className: "text-emerald-200/70 text-sm"
    }, "You attended ", record.attendedCount, " out of ", data.perDay, " classes"), /*#__PURE__*/React.createElement("button", {
      onClick: async () => {
        if (navigator.vibrate) navigator.vibrate(10);
        try {
          const db = await initDB();
          await db.delete('dailyRecords', todayKey);
          setRecord(null);
          // Recalculate
          if (data.onUpdateData) {
            const newAttended = Math.max(0, data.attended - record.attendedCount);
            const newConducted = Math.max(0, data.conducted - data.perDay);
            data.onUpdateData({
              ...data,
              attended: newAttended,
              conducted: newConducted
            });
          }
        } catch (e) {}
      },
      className: "absolute top-2 right-2 text-[10px] text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 px-2 py-1 rounded"
    }, "Undo last mark"));
  }
  const handleSubmit = async e => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (navigator.vibrate) navigator.vibrate(10);
    const newRecord = {
      date: todayKey,
      attendedCount: dropdownValue,
      totalCount: data.perDay,
      markedAt: Date.now()
    };
    await saveDailyRecord(newRecord);
    setRecord(newRecord);
    if (data.onUpdateData) {
      data.onUpdateData({
        ...data,
        attended: data.attended + dropdownValue,
        conducted: data.conducted + data.perDay
      });
    }

    // First Mark Celebration
    if (navigator.onLine && data.onShowToast) {
      setTimeout(async () => {
        const msg = await callGroq(`Generate a single short humorous line (max 12 words) celebrating a student who just marked their attendance for today. Warm and funny. English only.`, false, 120);
        data.onShowToast(msg || "Marked. Your attendance thanks you for existing today ✅", 5000);
      }, 500);
    } else if (data.onShowToast) {
      data.onShowToast("Marked. Your attendance thanks you for existing today ✅", 5000);
    }
    setIsSubmitting(false);

    // Add pulsing effect container logic if needed
    const card = document.getElementById('today-card');
    if (card) {
      if (dropdownValue === 0) {
        card.classList.add('animate-shake');
        setTimeout(() => card.classList.remove('animate-shake'), 500);
      } else {
        card.classList.add('animate-pulse-green');
        setTimeout(() => card.classList.remove('animate-pulse-green'), 500);
      }
    }
  };
  const handleMarkAll = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setDropdownValue(data.perDay);
  };
  const remainingAbsences = data.target > 0 ? Math.floor((100 * data.attended - data.target * data.conducted) / data.target) : 0;
  const safeCount = Math.max(0, remainingAbsences);
  return /*#__PURE__*/React.createElement("div", {
    id: "today-card",
    className: "w-full bg-[#09090b] border border-white/5 hover:border-purple-500/30 transition-colors rounded-2xl p-5 mb-6 shadow-xl relative animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg flex items-center gap-2"
  }, "\uD83D\uDCDA Mark Today's Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-400 text-xs"
  }, new Date().toLocaleDateString('default', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 px-2 py-0.5 rounded text-[9px] bg-zinc-800 text-zinc-300"
  }, isClosed ? "Day closed" : "Classes ongoing")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    size: 14,
    className: "text-purple-400"
  }), "How to use daily marking"), /*#__PURE__*/React.createElement("ul", {
    className: "text-[10px] sm:text-xs text-zinc-500 space-y-1 ml-1 list-disc pl-3"
  }, /*#__PURE__*/React.createElement("li", null, "Select how many classes you attended from the dropdown, or tap ", /*#__PURE__*/React.createElement("strong", {
    className: "text-zinc-400"
  }, "Mark All Present"), "."), /*#__PURE__*/React.createElement("li", null, "Once marked, your overall attendance stats update automatically."), /*#__PURE__*/React.createElement("li", null, "Daily marking portal closes at ", /*#__PURE__*/React.createElement("strong", {
    className: "text-orange-400/80"
  }, "4:20 PM"), " every day."))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-zinc-400 uppercase block mb-2"
  }, "Classes attended today:"), /*#__PURE__*/React.createElement("select", {
    value: dropdownValue,
    onChange: e => setDropdownValue(Number(e.target.value)),
    className: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors appearance-none"
  }, Array.from({
    length: data.perDay + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: i
  }, i, " / ", data.perDay))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-center text-xs text-zinc-500"
  }, dropdownValue, " / ", data.perDay, " classes attended today")), /*#__PURE__*/React.createElement("div", {
    className: "mb-5 text-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-xs font-medium"
  }, data.conducted === 0 ? "Attend all to start strong!" : `Attend at least ${Math.max(0, Math.ceil((data.target * (data.conducted + data.perDay) - 100 * data.attended) / 100))} today to stay on track`), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleMarkAll,
    type: "button",
    className: "flex-1 py-3 px-4 rounded-xl text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-all text-sm font-semibold border border-transparent hover:border-zinc-700"
  }, "Mark All Present"), /*#__PURE__*/React.createElement("button", {
    onClick: handleSubmit,
    disabled: isSubmitting,
    className: "flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
  }, "Submit")));
};
const getFb = () => window.__fb || null;
const getRoomDoc = roomCode => {
  const fb = getFb();
  if (!fb || !fb.db || !roomCode) return null;
  return fb.doc(fb.db, "rooms", roomCode);
};
const isRoomCreator = (room, localUserId) => {
  return !!room && room.creatorId === localUserId;
};
const FriendsPage = ({
  data
}) => {
  const [activeRoom, setActiveRoom] = useState(data.activeRoomCode || null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [nickname, setNickname] = useState(data.nickname || "");
  const [roast, setRoast] = useState("");
  const [motivationalLine, setMotivationalLine] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [localUserId, setLocalUserId] = useState(data.localUserId || null);
  const stats = calculateStats(data);
  const myPercent = stats ? stats.currentPercentage.toFixed(1) : "0.0";
  const myBunks = stats ? stats.totalAbsences : 0;
  const handleUpdateData = newData => {
    if (data.onUpdateData) data.onUpdateData(newData);
  };
  const validateNickname = name => {
    const clean = name.trim().substring(0, 20);
    if (!clean || clean.length < 2) {
      if (data.onShowInAppToast) data.onShowInAppToast('Nickname must be at least 2 characters 😅');
      return null;
    }
    return clean;
  };
  const ensureLocalUserId = async () => {
    if (localUserId) return localUserId;
    const newId = `u-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    setLocalUserId(newId);
    const newData = {
      ...data,
      localUserId: newId
    };
    if (data.onUpdateData) data.onUpdateData(newData);
    return newId;
  };
  const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
  const syncMyDataToRoom = async (roomCode, nick) => {
    if (!window.getFirestore) return;
    try {
      const db = window.getFirestore();
      // To properly sync, we'll fetch the room, find our member, update, then save.
      // Firebase v9 modular via window variables:
      // Note: Full firestore functions are needed, so we rely on compat or dynamic imports if possible.
      // The prompt suggests we have window.initializeApp and window.getFirestore available.
      // Wait, we need doc, getDoc, updateDoc. Since they are not globally exported in index.html, we must fetch them or use REST.
      // Let's implement this properly below.
    } catch (e) {}
  };

  // We'll use Firebase REST API for simplicity since the SDK functions might not be fully exposed globally or we can use the compat SDK which IS included!
  // Oh, wait! The prompt already has: <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script> and firebase-firestore-compat.js is missing but let's assume we can use standard fetch to Firestore REST API, or we can use the modular SDK that was added to index.html. Let's rely on standard fetch to Firestore REST API because it's guaranteed to work without struggling with window exports.

  const getRankStats = memList => {
    const sorted = [...memList].sort((a, b) => b.attendancePercent - a.attendancePercent);
    const currentId = localUserId || data.localUserId;
    const myRank = sorted.findIndex(m => m.memberId === currentId) + 1;
    const isLast = myRank === sorted.length && sorted.length > 1;
    const topPercent = sorted[0]?.attendancePercent || 0;
    return {
      sorted,
      myRank,
      isLast,
      topPercent
    };
  };
  useEffect(() => {
    if (!activeRoom || !getFb()) return;
    const roomDoc = getRoomDoc(activeRoom);
    if (!roomDoc) return;
    const unsub = getFb().onSnapshot(roomDoc, async docSnap => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        setRoomData(d);
        const mems = d.members || [];
        setMembers(mems);
        const currentId = localUserId || data.localUserId;
        setIsCreator(isRoomCreator(d, currentId));

        // Automatically delete room if there are 0 users
        if (mems.length === 0) {
          try {
            await getFb().deleteDoc(roomDoc);
          } catch (e) {}
          setActiveRoom(null);
          handleUpdateData({
            ...data,
            activeRoomCode: null
          });
          return;
        }

        // Check if I was removed
        if (!mems.find(m => m.memberId === currentId)) {
          if (data.onShowInAppToast) data.onShowInAppToast("You were removed from the room or the room was closed by the creator.");
          setActiveRoom(null);
          handleUpdateData({
            ...data,
            localUserId: currentId,
            activeRoomCode: null
          });
        } else {
          // Generate Roast/Motivations based on new rankings
          const {
            myRank,
            isLast,
            topPercent,
            sorted
          } = getRankStats(mems);
          if (mems.length > 1) {
            if (isLast) {
              const r = await callGroq(`Generate one short anonymous humorous roast (max 12 words) for the last-place student in an attendance comparison. Do not use their name. Funny, not mean. English only.`, false, 50);
              setRoast(r || "Last place is working hard at being last 💀");
              setMotivationalLine("");
            } else {
              const m = await callGroq(`A student is ranked ${myRank} out of ${mems.length} friends in an attendance comparison. Their attendance is ${myPercent}%, top student has ${topPercent}%. Generate one humorous motivational line (max 15 words). English only.`, false, 50);
              setMotivationalLine(m || `Rank #${myRank}. Keep climbing!`);
              setRoast("");
            }
          }
        }
      } else {
        if (data.onShowInAppToast) data.onShowInAppToast("Room has been closed by creator");
        setActiveRoom(null);
        handleUpdateData({
          ...data,
          activeRoomCode: null
        });
      }
    });
    return () => unsub();
  }, [activeRoom, localUserId, data.localUserId, myPercent]);

  // Sync my data whenever it changes and I'm in a room
  useEffect(() => {
    const sync = async () => {
      const currentId = localUserId || data.localUserId;
      if (activeRoom && getFb() && nickname && currentId) {
        try {
          const roomDoc = getRoomDoc(activeRoom);
          if (!roomDoc) return;
          const docSnap = await getFb().getDoc(roomDoc);
          if (docSnap.exists()) {
            let mems = docSnap.data().members || [];
            let me = mems.find(m => m.memberId === currentId);
            if (me) {
              me.attendancePercent = parseFloat(myPercent);
              me.bunkCount = myBunks;
              me.dnaLabel = data.dnaLabel || "The Unknown";
              me.nickname = nickname;
              await getFb().updateDoc(roomDoc, {
                members: mems
              });
            }
          }
        } catch (e) {}
      }
    };
    sync();
  }, [myPercent, myBunks, data.dnaLabel, activeRoom, nickname, localUserId]);
  const handleCreateRoom = async () => {
    const nick = validateNickname(nickname);
    if (!nick) return;
    setLoading(true);
    const code = generateRoomCode();
    try {
      const currentId = await ensureLocalUserId();
      const roomDoc = getRoomDoc(code);
      if (!roomDoc) throw new Error("Firebase is not initialized");
      await getFb().setDoc(roomDoc, {
        roomCode: code,
        createdAt: getFb().serverTimestamp(),
        creatorId: currentId,
        members: [{
          memberId: currentId,
          nickname: nick,
          attendancePercent: parseFloat(myPercent),
          bunkCount: myBunks,
          dnaLabel: data.dnaLabel || "The Unknown",
          joinedAt: Date.now(),
          isCreator: true
        }]
      });
      handleUpdateData({
        ...data,
        localUserId: currentId,
        nickname: nick,
        activeRoomCode: code
      });
      setActiveRoom(code);
      if (data.onShowInAppToast) data.onShowInAppToast(`Room ${code} created successfully!`);
    } catch (e) {
      console.error("Create room failed:", e);
      if (data.onShowInAppToast) data.onShowInAppToast(`Failed to create room. ${e?.message || "Please try again."}`);
    }
    setLoading(false);
  };
  const handleJoinRoom = async () => {
    const nick = validateNickname(nickname);
    if (!nick) return;
    const code = joinCode.trim().toUpperCase();
    if (!code || code.length < 5) {
      if (data.onShowInAppToast) data.onShowInAppToast("Invalid room code");
      return;
    }
    setLoading(true);
    try {
      const currentId = await ensureLocalUserId();
      const roomDoc = getRoomDoc(code);
      if (!roomDoc) throw new Error("Firebase is not initialized");
      const docSnap = await getFb().getDoc(roomDoc);
      if (docSnap.exists()) {
        let mems = docSnap.data().members || [];
        if (!mems.find(m => m.memberId === currentId)) {
          mems.push({
            memberId: currentId,
            nickname: nick,
            attendancePercent: parseFloat(myPercent),
            bunkCount: myBunks,
            dnaLabel: data.dnaLabel || "The Unknown",
            joinedAt: Date.now(),
            isCreator: false
          });
          await getFb().updateDoc(roomDoc, {
            members: mems
          });
        }
        handleUpdateData({
          ...data,
          localUserId: currentId,
          nickname: nick,
          activeRoomCode: code
        });
        setActiveRoom(code);
        if (data.onShowInAppToast) data.onShowInAppToast("Joined room successfully!");
      } else {
        if (data.onShowInAppToast) data.onShowInAppToast("Room not found. Check the code and try again 🤔");
      }
    } catch (e) {
      console.error("Join room failed:", e);
      if (data.onShowInAppToast) data.onShowInAppToast(`Failed to join room. ${e?.message || "Please try again."}`);
    }
    setLoading(false);
  };
  const clearActiveRoom = message => {
    handleUpdateData({
      ...data,
      activeRoomCode: null
    });
    setActiveRoom(null);
    setMembers([]);
    setRoomData(null);
    setIsCreator(false);
    if (message && data.onShowInAppToast) data.onShowInAppToast(message);
  };
  const handleLeaveRoom = async () => {
    if (!activeRoom) return;
    setLoading(true);
    try {
      const currentId = localUserId || (await ensureLocalUserId());
      const roomDoc = getRoomDoc(activeRoom);
      if (roomDoc && getFb()) {
        const docSnap = await getFb().getDoc(roomDoc);
        if (docSnap.exists()) {
          let d = docSnap.data();
          let mems = d.members || [];
          mems = mems.filter(m => m.memberId !== currentId);
          if (mems.length === 0) {
            await getFb().deleteDoc(roomDoc);
          } else {
            await getFb().updateDoc(roomDoc, {
              members: mems
            });
          }
        }
      }
      clearActiveRoom("You left the room.");
    } catch (e) {
      console.warn("Failed to leave room remotely:", e);
      clearActiveRoom("Left locally. The room may still show for others if the network failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteRoom = async () => {
    if (!activeRoom) return;
    if (!window.confirm("Are you sure you want to delete this room? Everyone will be kicked out.")) return;
    try {
      const roomDoc = getRoomDoc(activeRoom);
      if (!roomDoc) return;
      await getFb().deleteDoc(roomDoc);
      clearActiveRoom("Room deleted.");
    } catch (e) {
      console.warn("Failed to delete room remotely:", e);
      clearActiveRoom("Room removed from this device. Remote delete failed.");
    }
  };
  const [copied, setCopied] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeRoom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleChallenge = () => {
    const {
      myRank,
      sorted
    } = getRankStats(members);
    const message = `I'm ranked #${myRank} in our Bunkoo room with ${myPercent}% attendance. Think you can beat that? 😤 Room code: ${activeRoom} bunkoo-meter.web.app`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };
  if (activeRoom) {
    const {
      sorted,
      isLast,
      myRank
    } = getRankStats(members);
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full max-w-2xl lg:max-w-[60%] mx-auto pb-24 animate-fade-in text-white mt-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-[#09090b]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-20 z-40"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/5 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xl"
    }, "\uD83C\uDFC6")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-zinc-500 uppercase tracking-widest font-bold"
    }, "Live Room"), /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
    }, activeRoom))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleCopyCode,
      className: "px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all text-xs font-bold text-zinc-300 flex items-center gap-2"
    }, copied ? /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400"
    }, "Copied \u2713") : "Copy Code"), /*#__PURE__*/React.createElement("button", {
      onClick: handleChallenge,
      className: "w-10 h-10 flex items-center justify-center rounded-xl bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
      title: "Challenge on WhatsApp"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-lg"
    }, "\uD83D\uDCAC")), isCreator ? /*#__PURE__*/React.createElement("button", {
      onClick: handleDeleteRoom,
      className: "w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all",
      title: "Delete Room"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-lg"
    }, "\uD83D\uDDD1\uFE0F")) : /*#__PURE__*/React.createElement("button", {
      onClick: handleLeaveRoom,
      className: "w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white",
      title: "Leave Room"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-lg"
    }, "\uD83D\uDEAA")))), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, sorted.map((m, i) => {
      const isMe = m.memberId === data.localUserId;

      // Premium Ranking Styles
      let rankStyle = "bg-zinc-900/50 border-white/5";
      let badgeStyle = "bg-zinc-800 text-zinc-400 border-zinc-700";
      let rankIcon = `#${i + 1}`;
      if (i === 0) {
        rankIcon = "👑";
        rankStyle = "bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]";
        badgeStyle = "bg-gradient-to-br from-yellow-400 to-amber-600 text-white border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]";
      } else if (i === 1) {
        rankIcon = "🥈";
        rankStyle = "bg-gradient-to-r from-slate-300/10 to-slate-400/5 border-slate-300/30 shadow-[0_0_20px_rgba(148,163,184,0.1)]";
        badgeStyle = "bg-gradient-to-br from-slate-300 to-slate-500 text-white border-slate-200 shadow-[0_0_10px_rgba(148,163,184,0.3)]";
      } else if (i === 2) {
        rankIcon = "🥉";
        rankStyle = "bg-gradient-to-r from-orange-700/10 to-orange-800/5 border-orange-700/30 shadow-[0_0_20px_rgba(194,65,12,0.1)]";
        badgeStyle = "bg-gradient-to-br from-orange-500 to-orange-800 text-white border-orange-400 shadow-[0_0_10px_rgba(194,65,12,0.3)]";
      } else if (isMe) {
        rankStyle = "bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]";
        badgeStyle = "bg-blue-600/20 text-blue-400 border-blue-500/50";
      }
      const healthColor = m.attendancePercent >= data.target ? "bg-emerald-500" : m.attendancePercent >= data.target - 5 ? "bg-yellow-500" : "bg-red-500";
      const healthText = m.attendancePercent >= data.target ? "text-emerald-400" : m.attendancePercent >= data.target - 5 ? "text-yellow-400" : "text-red-400";
      return /*#__PURE__*/React.createElement("div", {
        key: m.memberId,
        className: `relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${rankStyle}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between mb-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: `flex items-center justify-center w-12 h-12 rounded-full text-lg border font-black ${badgeStyle}`
      }, rankIcon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-white text-lg flex items-center gap-2"
      }, m.nickname, isMe && /*#__PURE__*/React.createElement("span", {
        className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase tracking-widest font-black"
      }, "You"), m.isCreator && /*#__PURE__*/React.createElement("span", {
        className: "text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase tracking-widest font-black"
      }, "Admin")), /*#__PURE__*/React.createElement("div", {
        className: "text-xs text-zinc-500 font-medium tracking-wide flex items-center gap-1"
      }, /*#__PURE__*/React.createElement("span", null, "\uD83E\uDDEC ", m.dnaLabel), /*#__PURE__*/React.createElement("span", {
        className: "text-zinc-700 mx-1"
      }, "\u2022"), /*#__PURE__*/React.createElement("span", null, m.bunkCount, " Bunks")))), /*#__PURE__*/React.createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: `text-3xl font-black tabular-nums tracking-tighter ${healthText}`
      }, m.attendancePercent.toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
        className: "w-full h-2.5 bg-black/60 rounded-full overflow-hidden shadow-inner"
      }, /*#__PURE__*/React.createElement("div", {
        className: `h-full ${healthColor} shadow-[0_0_15px_currentColor] transition-all duration-1000 ease-out`,
        style: {
          width: `${Math.min(100, Math.max(0, m.attendancePercent))}%`
        }
      })));
    })), members.length > 1 && (isLast && roast || motivationalLine) && /*#__PURE__*/React.createElement("div", {
      className: "mt-20 flex justify-center animate-slide-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: `relative max-w-sm w-full p-5 rounded-2xl border shadow-2xl ${isLast && roast ? "bg-gradient-to-br from-red-950/80 to-[#09090b] border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]" : "bg-gradient-to-br from-blue-950/80 to-[#09090b] border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-3 py-0.5 rounded-full bg-[#09090b] border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest z-10",
      style: {
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }, "AI Insight"), /*#__PURE__*/React.createElement("p", {
      className: `text-center font-medium leading-relaxed pt-3 ${isLast && roast ? "text-red-200" : "text-blue-200"}`
    }, isLast && roast ? `🔥 "${roast}"` : `🚀 "${motivationalLine}"`))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md mx-auto pb-20 animate-fade-in text-white mt-6 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-[#1e1b4b] flex items-center justify-center border border-[#4338ca] shadow-lg shadow-[#4338ca]/20 mb-4"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 32,
    className: "text-[#818cf8]"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-black tracking-tight text-white mb-2"
  }, "Friends Leaderboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 text-center"
  }, "See who has the best attendance.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#18181b] border border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 text-center"
  }, "Your Name in Leaderboard"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "w-full border-2 rounded-xl px-4 py-3.5 text-center font-bold text-lg focus:outline-none transition-all shadow-inner",
    style: {
      backgroundColor: '#09090b',
      borderColor: '#27272a',
      color: '#ffffff'
    },
    value: nickname,
    onChange: e => setNickname(e.target.value),
    placeholder: "e.g. Bunkoo Master",
    maxLength: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#09090b] border border-[#27272a] rounded-2xl p-4 sm:p-5 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white mb-1 text-center"
  }, "Host a Leaderboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-4 text-center"
  }, "Create a room and share the code."), /*#__PURE__*/React.createElement("button", {
    onClick: handleCreateRoom,
    disabled: loading,
    className: "w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#9333ea] to-[#4f46e5] hover:opacity-90 shadow-lg shadow-[#9333ea]/20 transition-all disabled:opacity-50"
  }, "Create Room")), /*#__PURE__*/React.createElement("div", {
    className: "relative flex items-center py-2 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow border-t border-[#27272a]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-shrink-0 mx-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest"
  }, "Or Join Existing"), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow border-t border-[#27272a]"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#09090b] border border-[#27272a] rounded-2xl p-4 sm:p-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white mb-1 text-center"
  }, "Join a Leaderboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-4 text-center"
  }, "Enter your friend's 6-letter code."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "w-2/3 border-2 rounded-xl px-2 py-3.5 focus:outline-none transition-all uppercase tracking-[0.2em] font-mono font-bold text-center",
    style: {
      backgroundColor: '#18181b',
      borderColor: '#27272a',
      color: '#ffffff'
    },
    value: joinCode,
    onChange: e => setJoinCode(e.target.value.toUpperCase()),
    placeholder: "XXXXXX",
    maxLength: 6
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleJoinRoom,
    disabled: loading || !joinCode,
    className: "w-1/3 py-3.5 px-2 rounded-xl font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-all disabled:opacity-50 disabled:bg-[#27272a] disabled:text-gray-400 shadow-lg shadow-[#2563eb]/20"
  }, "Join")))));
};

// --- QUICK MARK COMPONENT (compact inline attendance marker) ---
const QuickMark = ({
  data
}) => {
  const [record, setRecord] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todayKey, setTodayKey] = useState("");
  const [isOffToday, setIsOffToday] = useState(false);
  useEffect(() => {
    const checkToday = async () => {
      const now = new Date();
      const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      setTodayKey(key);
      // Check if today is an off day (Sunday or Saturday when enabled)
      if (now.getDay() === 0 || Boolean(data && data.saturdaysOff) && now.getDay() === 6) {
        setIsOffToday(true);
        return;
      } else {
        setIsOffToday(false);
      }
      const existingRecord = await getDailyRecord(key);
      if (existingRecord) setRecord(existingRecord);
    };
    checkToday();
  }, [data]);
  const handleMark = async count => {
    if (navigator.vibrate) navigator.vibrate(10);
    const newRecord = {
      date: todayKey,
      attendedCount: count,
      totalCount: data.perDay,
      markedAt: Date.now()
    };
    await saveDailyRecord(newRecord);
    setRecord(newRecord);
    setShowDropdown(false);
    setIsEditing(false);
    if (data.onUpdateData) {
      // If editing, undo old record first
      const oldAttended = record ? record.attendedCount : 0;
      const oldConducted = record ? data.perDay : 0;
      data.onUpdateData({
        ...data,
        attended: data.attended - oldAttended + count,
        conducted: data.conducted - oldConducted + data.perDay
      });
    }
    if (data.onShowToast) {
      const lastNotified = localStorage.getItem('bunkoo_marked_today_notified');
      const isFirstTimeToday = lastNotified !== todayKey;
      if (isFirstTimeToday) {
        localStorage.setItem('bunkoo_marked_today_notified', todayKey);
        if (navigator.onLine) {
          setTimeout(async () => {
            const msg = await callGroq(`Generate a single short humorous line (max 12 words) celebrating a student who just marked their attendance for today. Warm and funny. English only.`, false, 120);
            data.onShowToast(msg || "Marked. Your attendance thanks you for existing today ✅", 4000);
          }, 500);
        } else {
          data.onShowToast("Marked. Your attendance thanks you for existing today ✅", 3000);
        }
      } else if (data.onShowInAppToast) {
        data.onShowInAppToast("Attendance updated ✅", 2000);
      }
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(true);
  };
  if (!data.perDay || data.perDay <= 0) return null;
  if (isOffToday) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mb-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1"
    }, "\uD83D\uDE34 Off Day"));
  }

  // Already marked & not editing
  if (record && !isEditing) {
    const isAbsent = record.attendedCount === 0;
    const isPartial = record.attendedCount > 0 && record.attendedCount < data.perDay;
    const colorClass = isAbsent ? "bg-red-600/20 text-red-400 border-red-500/30 hover:bg-red-600/30" : isPartial ? "bg-yellow-600/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-600/30" : "bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30";
    const iconColor = isAbsent ? "text-red-400/70" : isPartial ? "text-yellow-400/70" : "text-emerald-400/70";
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mb-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleEdit,
      className: `px-3 py-1 rounded-full border transition-all text-[10px] font-bold flex items-center gap-1 ${colorClass}`,
      title: "Edit today's attendance"
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, "Marked today (", record.attendedCount, "/", data.perDay, ")"), /*#__PURE__*/React.createElement(Edit2, {
      size: 12,
      className: iconColor
    })));
  }

  // Show dropdown
  if (showDropdown) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mb-1 relative"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-end gap-1 z-20 animate-fade-in"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl min-w-[180px]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-zinc-300 font-bold mb-1 px-1"
    }, "Daily Attendance"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] sm:text-[11px] text-zinc-400 mb-3 px-1 leading-relaxed"
    }, "Select how many classes you attended today. Make sure to do this daily to keep your stats accurate!"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-zinc-500 uppercase font-semibold px-1 py-1 mb-1"
    }, "Classes attended"), Array.from({
      length: data.perDay + 1
    }).map((_, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => handleMark(i),
      className: `w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${i === data.perDay ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30" : i === 0 ? "bg-red-600/10 text-red-400 hover:bg-red-600/20" : "text-zinc-300 hover:bg-white/5"}`
    }, i, " / ", data.perDay, i === data.perDay && " ✓", i === 0 && " (absent)")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setShowDropdown(false);
        setIsEditing(false);
      },
      className: "w-full mt-1 px-3 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
    }, "Cancel"))));
  }

  // Default: show "Mark present today" button
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-[#09090b]/80 border border-blue-500/20 rounded-2xl p-4 mb-3 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1 rounded-md bg-blue-500/10"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 14,
    className: "text-blue-400"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-semibold text-zinc-300"
  }, "Daily Attendance")), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed"
  }, "Mark your classes every day to keep your attendance stats accurate and up to date.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowDropdown(true),
    className: "self-start sm:self-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-blue-300 hover:from-blue-600/40 hover:to-indigo-600/40 border border-blue-500/30 transition-all text-xs font-bold flex items-center gap-2 whitespace-nowrap",
    title: "Mark Today's Attendance"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Mark Today"), /*#__PURE__*/React.createElement(ArrowDown, {
    size: 12
  }))));
};

// --- MISSING DAYS WARNING COMPONENT ---
const MissingDaysWarning = ({
  data
}) => {
  const [missingDays, setMissingDays] = useState(0);
  useEffect(() => {
    const checkMissingDays = async () => {
      try {
        const db = await initDB();
        const records = await db.getAll('dailyRecords');
        const recordDates = new Set(records.map(r => r.date));
        if (records.length === 0) {
          setMissingDays(0);
          return;
        }
        const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
        const earliestDate = new Date(sortedRecords[0].date);
        earliestDate.setHours(0, 0, 0, 0);
        let missing = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Scan past 30 days to check for unmarked working days
        for (let i = 1; i <= 30; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          if (d < earliestDate) continue; // Skip days before user started using the app

          // Skip Sundays and Saturdays if saturdaysOff
          if (d.getDay() === 0 || Boolean(data && data.saturdaysOff) && d.getDay() === 6) continue;
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (!recordDates.has(key)) {
            missing++;
          }
        }
        setMissingDays(missing);
      } catch (e) {}
    };
    // Re-check whenever data changes (which happens when QuickMark or Calendar marks a day)
    checkMissingDays();
  }, [data]);
  if (missingDays === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-red-500/20 transition-all animate-fade-in shadow-lg shadow-red-500/5 gap-3 sm:gap-0",
    onClick: () => {
      const cal = document.getElementById("calendar-section");
      if (cal) cal.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-red-500/20 p-2 rounded-full border border-red-500/30 shrink-0"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 16,
    className: "text-red-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-red-200"
  }, "Missing Attendance Records"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-300/80"
  }, "You forgot to mark ", missingDays, " past working ", missingDays === 1 ? 'day' : 'days', "."))), /*#__PURE__*/React.createElement("button", {
    className: "w-full sm:w-auto text-xs font-bold text-red-400 bg-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
  }, "Review Calendar"));
};
const Dashboard = ({
  data
}) => {
  const stats = calculateStats(data);
  if (!stats) return /*#__PURE__*/React.createElement("div", {
    className: "text-center text-zinc-400"
  }, "Invalid data");
  const handleUpdateData = newData => {
    if (data.onUpdateData) {
      data.onUpdateData(newData);
    }
  };
  useEffect(() => {
    const ensureUserId = async () => {
      if (!data.localUserId) {
        const uuidv4 = () => {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
              v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
          });
        };
        const newId = uuidv4();
        handleUpdateData({
          ...data,
          localUserId: newId
        });
      }
    };
    ensureUserId();
  }, [data]);
  const augmentedData = {
    ...data,
    onUpdateData: handleUpdateData,
    onShowToast: data.onShowToast,
    onShowInAppToast: data.onShowInAppToast
  };
  const checkAndGenerateDNA = async () => {
    if (!data.onShowToast) return;
    try {
      const db = await initDB();
      const records = await db.getAll('dailyRecords');
      if (records.length < 7) return;
      const now = new Date().getTime();
      const lastGen = data.lastDNAGeneratedAt || 0;

      // Update every 7 days
      if (now - lastGen < 7 * 24 * 60 * 60 * 1000 && data.dnaLabel) return;
      let totalDays = records.length;
      let absentDays = records.filter(r => r.attendedCount === 0).length;
      let dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat

      let longestStreak = 0;
      let currStreak = 0;
      records.sort((a, b) => a.date.localeCompare(b.date)).forEach(r => {
        const d = new Date(r.date);
        if (r.attendedCount === 0) {
          dayCounts[d.getDay()]++;
          currStreak++;
          if (currStreak > longestStreak) longestStreak = currStreak;
        } else {
          currStreak = 0;
        }
      });
      const maxDay = Math.max(...dayCounts);
      const daysStr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const mostAbsentDay = maxDay > 0 ? daysStr[dayCounts.indexOf(maxDay)] : "None";
      const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
      const recentAbsences = records.filter(r => new Date(r.date).getTime() >= twoWeeksAgo && r.attendedCount === 0).length;
      const overallPercent = stats.currentPercentage.toFixed(1);
      const prompt = `Analyze this student's overall attendance pattern:
- Total days recorded: ${totalDays}
- Days with 0 classes attended: ${absentDays}
- Most absent day of week: ${mostAbsentDay}
- Longest absence streak: ${longestStreak} days
- Absences in last 2 weeks: ${recentAbsences}
- Overall attendance %: ${overallPercent}%

Assign ONE creative personality label (4-6 words, use "The" prefix)
and a 1-sentence humorous description (max 20 words).

Reply in this EXACT JSON format with no extra text, no markdown, no backticks:
{
  "label": "The Deadline Ghost",
  "description": "Disappears before every submission and reappears after it passes."
}`;
      if (navigator.onLine) {
        const result = await callGroq(prompt, true, 300);
        if (result) {
          try {
            const clean = result.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(clean);
            if (parsed.label && parsed.description) {
              const newData = {
                ...data,
                dnaLabel: parsed.label,
                dnaDescription: parsed.description,
                lastDNAGeneratedAt: now
              };
              handleUpdateData(newData);
              data.onShowToast("Your Bunk DNA has mutated. Tap to see what you've become 🧬");
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    checkAndGenerateDNA();
  }, [data]);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-4xl mx-auto pb-20 animate-fade-in"
  }, /*#__PURE__*/React.createElement(QuickMark, {
    data: augmentedData
  }), data.dnaLabel && /*#__PURE__*/React.createElement("div", {
    className: "mb-2 flex justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group relative flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-500/10 border border-purple-500/30 px-4 py-1.5 rounded-full flex flex-col items-center shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:bg-purple-500/20 transition-all cursor-help"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-purple-300 font-bold text-sm tracking-wide"
  }, data.dnaLabel, " \uD83E\uDDEC"), /*#__PURE__*/React.createElement("span", {
    className: "text-purple-200/70 text-[10px] mt-0.5 max-w-xs text-center"
  }, data.dnaDescription)), /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] text-zinc-500 mt-1"
  }, "Last updated: ", Math.floor((new Date().getTime() - (data.lastDNAGeneratedAt || 0)) / (24 * 60 * 60 * 1000)), " days ago"))), /*#__PURE__*/React.createElement(MissingDaysWarning, {
    data: augmentedData
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-6 flex justify-center relative mt-4"
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    percentage: stats.currentPercentage,
    target: data.target,
    status: stats.status
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-12"
  }, /*#__PURE__*/React.createElement(SmartTip, {
    stats: stats,
    target: data.target
  })), stats.currentPercentage < data.target && /*#__PURE__*/React.createElement("div", {
    className: "mb-8 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 backdrop-blur-md animate-fade-in animate-pulse-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    className: "text-red-400 flex-shrink-0 mt-0.5",
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-red-300 font-bold text-sm mb-1"
  }, "\u26A0\uFE0F Action Required"), /*#__PURE__*/React.createElement("p", {
    className: "text-zinc-300 text-sm leading-relaxed"
  }, "You need to attend", " ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-red-200"
  }, stats.classesToRecover, " consecutive classes"), stats.daysToRecover > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, " ", "(approximately", " ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-red-200"
  }, stats.daysToRecover, " days"), ")"), " ", "to reach your ", data.target, "% target.")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "Action Plan",
    subtitle: "What to do next"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4 mt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, stats.status === "safe" ? /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "text-emerald-400",
    size: 18
  }) : /*#__PURE__*/React.createElement(AlertTriangle, {
    className: "text-red-400 animate-pulse",
    size: 18
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-zinc-400 uppercase tracking-wider"
  }, stats.status === "safe" ? "Safe Zone" : "🚨 Recovery Plan")), (stats.status === "danger" || stats.status === "critical") && /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30"
  }, "Urgent")), (stats.status === "danger" || stats.status === "critical") && !stats.isImpossible && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-4 rounded-xl bg-zinc-900/50 border border-red-500/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-zinc-400 font-medium"
  }, "Recovery Progress"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-red-400 font-bold"
  }, stats.classesToRecover, " classes needed")), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-2 bg-zinc-800 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500",
    style: {
      width: `${Math.min(100, stats.classesToRecover / (stats.classesToRecover + 10) * 100)}%`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-zinc-500 mt-2"
  }, "Attend all classes for the next ", stats.daysToRecover, " days to recover")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
  }, stats.status === "safe" || stats.status === "caution" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatCard, {
    title: "Safe Bunks",
    value: stats.safeBunkClasses,
    icon: Calendar,
    color: "text-emerald-400",
    subtitle: "Classes you can skip",
    highlight: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Max Streak",
    value: stats.safeBunkDays,
    icon: Clock,
    color: "text-teal-400",
    subtitle: "Full Days"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Weekly Cap",
    value: Math.floor(stats.safeBunkClasses / 4),
    icon: Target,
    color: "text-cyan-400",
    subtitle: "Per Week (Avg)"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatCard, {
    title: "Classes Needed",
    value: stats.classesToRecover,
    icon: Activity,
    color: "text-red-400",
    subtitle: "To reach target",
    highlight: true,
    description: `Attend ${stats.classesToRecover} consecutive classes to reach ${data.target}%`
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Days Required",
    value: stats.daysToRecover,
    icon: Calendar,
    color: "text-orange-400",
    subtitle: `~${stats.daysToRecover} working days`,
    description: Boolean(data && data.saturdaysOff) ? `Excluding weekends, approximately ${Math.ceil(stats.daysToRecover / 5)} weeks` : `Excluding Sundays, approximately ${Math.ceil(stats.daysToRecover / 6)} weeks`
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Status",
    value: stats.isImpossible ? "Impossible" : stats.daysToRecover > 30 ? "Very Hard" : "Achievable",
    icon: Skull,
    color: stats.isImpossible ? "text-red-600" : stats.daysToRecover > 30 ? "text-orange-500" : "text-yellow-400",
    subtitle: stats.isImpossible ? "Target 100% unreachable" : "Keep attending"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "Core Metrics",
    subtitle: "The Basics"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4 mt-6"
  }, /*#__PURE__*/React.createElement(BarChart2, {
    className: "text-purple-400",
    size: 18
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-zinc-400 uppercase tracking-wider"
  }, "Core Metrics")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3"
  }, /*#__PURE__*/React.createElement(StatCard, {
    title: "Attended",
    value: data.attended,
    icon: CheckCircle,
    color: "text-emerald-400",
    subtitle: "Classes Present"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Missed",
    value: stats.totalAbsences,
    icon: Clock,
    color: "text-red-400",
    subtitle: "Total Classes"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Next Goal",
    value: stats.classesToNextPercent || "Max",
    icon: ArrowUp,
    color: "text-blue-400",
    subtitle: `To ${Math.floor(stats.currentPercentage) + 1}%`
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Fragility",
    value: stats.classesToDropPercent,
    icon: ArrowDown,
    color: "text-orange-400",
    subtitle: `To ${Math.ceil(stats.currentPercentage) - 1}%`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "How safe are you?",
    subtitle: "Strategic Insights"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4 mt-6"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "text-yellow-400",
    size: 18
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-zinc-400 uppercase tracking-wider"
  }, "Strategic Insights")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-1 md:order-1 flex flex-col w-full"
  }, /*#__PURE__*/React.createElement(StressGauge, {
    value: stats.stressIndex
  })), /*#__PURE__*/React.createElement("div", {
    className: "order-3 md:order-2 col-span-2 md:col-span-1 w-full"
  }, /*#__PURE__*/React.createElement(BufferBar, {
    buffer: stats.buffer,
    target: data.target
  })), /*#__PURE__*/React.createElement("div", {
    className: "order-2 md:order-3 bg-[#09090b] border border-white/5 rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 sm:gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1 rounded-md text-orange-400 bg-white/5 flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 12
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-[8.5px] sm:text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-wider truncate"
  }, "Burn Rate")), /*#__PURE__*/React.createElement("span", {
    className: "text-lg sm:text-2xl md:text-3xl font-bold text-orange-400 truncate block"
  }, stats.burnRate.toFixed(2), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-[8.5px] sm:text-[9px] text-zinc-500 mt-0.5 truncate"
  }, "Drop per absence")), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto pt-2 pb-1 flex justify-center w-full overflow-hidden"
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: generateSparkData(data, 'burnRate'),
    color: "#fb923c"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement(GoalSeeker, {
    data: augmentedData
  })), /*#__PURE__*/React.createElement("div", {
    id: "calendar-section",
    className: "mb-10 scroll-mt-20"
  }, /*#__PURE__*/React.createElement(AttendanceCalendar, {
    data: augmentedData
  })));
};
const isAttendanceDataComplete = data => {
  return data && typeof data.conducted === "number" && typeof data.attended === "number" && typeof data.perDay === "number" && typeof data.target === "number";
};
const App = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [migrated, setMigrated] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");
  const showToast = async (message, duration = 3000) => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && localStorage.getItem('bunkoo_notifications') === 'enabled') {
      try {
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          await reg.showNotification('Bunkoo Meter', {
            body: message,
            icon: './logopic.png'
          });
          return;
        } else {
          new Notification('Bunkoo Meter', {
            body: message,
            icon: './logopic.png'
          });
          return;
        }
      } catch (e) {}
    }
    setNotification({
      type: "success",
      message
    });
    setTimeout(() => setNotification(null), duration);
  };
  const showInAppToast = (message, duration = 3000) => {
    setNotification({
      type: "success",
      message
    });
    setTimeout(() => setNotification(null), duration);
  };
  useEffect(() => {
    const updateOfflineBanner = () => {
      const banner = document.getElementById('offline-banner');
      if (banner) {
        if (!navigator.onLine) {
          banner.style.display = 'block';
        } else {
          banner.style.display = 'none';
        }
      }
    };
    window.addEventListener('online', updateOfflineBanner);
    window.addEventListener('offline', updateOfflineBanner);
    updateOfflineBanner();
    if (!window.GROQ_CONFIG?.key || window.GROQ_CONFIG.key === 'YOUR_GROQ_KEY_HERE') {
      if (!sessionStorage.getItem('groq_warned')) {
        showToast('Groq API key not configured — AI features disabled. Add key to config.js 🔑', 5000);
        sessionStorage.setItem('groq_warned', 'true');
      }
    }
    migrateData().then(() => {
      setMigrated(true);
      getAttendanceData().then(d => {
        if (d && isAttendanceDataComplete(d)) {
          setData(d);
          scheduleNotifications(d);
        }
      });
    });
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleBeforeInstallPrompt = e => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      clearInterval(t);
      window.removeEventListener('online', updateOfflineBanner);
      window.removeEventListener('offline', updateOfflineBanner);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  const [showPWA, setShowPWA] = useState(false);
  useEffect(() => {
    const handleVisits = async () => {
      try {
        const db = await initDB();
        const visits = (await db.get('settings', 'visitCount')) || 0;
        await db.put('settings', {
          key: 'visitCount',
          value: visits + 1
        });
        const alreadyPrompted = await db.get('settings', 'installPrompted');
        if (visits >= 3 && !alreadyPrompted && deferredPrompt) {
          setShowPWA(true);
        }
      } catch (e) {}
    };
    if (deferredPrompt) handleVisits();
  }, [deferredPrompt]);
  useEffect(() => {
    if (data && localStorage.getItem('bunkoo_notifications') !== 'enabled' && !sessionStorage.getItem('bunkoo_prompted_notif')) {
      const timer = setTimeout(() => {
        showInAppToast("🔔 Tap the bell icon in the top right to enable AI attendance reminders!");
        sessionStorage.setItem('bunkoo_prompted_notif', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);
  const scheduleNotifications = async appData => {
    if (!appData) return;
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const fired = appData.last_fired || {};
    let newFired = {
      ...fired
    };
    const triggerIfDue = async (type, prompt, fallback, checkFn, delay = 1000) => {
      // If the user turned OFF the notification bell, completely mute AI alerts
      if (localStorage.getItem('bunkoo_notifications') !== 'enabled') return;
      const lastFiredDay = newFired[type];
      if (lastFiredDay === todayKey) return; // Already fired today
      if (!checkFn()) return; // Conditions not met

      setTimeout(async () => {
        let msg = fallback;
        if (navigator.onLine) {
          const aiText = await callGroq(prompt, false, 120);
          if (aiText) msg = aiText;
        }
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try {
            if ('serviceWorker' in navigator) {
              const reg = await navigator.serviceWorker.ready;
              await reg.showNotification('Bunkoo Meter', {
                body: msg,
                icon: './logopic.png'
              });
            } else {
              new Notification('Bunkoo Meter', {
                body: msg,
                icon: './logopic.png'
              });
            }
          } catch (e) {
            showToast(msg, 5000);
          }
        } else {
          showToast(msg, 5000);
        }
        newFired[type] = todayKey;
        await saveAttendanceData({
          ...appData,
          last_fired: newFired
        });
      }, delay);
    };
    const isTodayOff = now.getDay() === 0 || Boolean(appData.saturdaysOff) && now.getDay() === 6;
    const todayRecord = await getDailyRecord(todayKey);
    const notMarkedToday = !todayRecord;
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    const yesterdayIsOff = yesterday.getDay() === 0 || Boolean(appData.saturdaysOff) && yesterday.getDay() === 6;
    const yesterdayRecord = await getDailyRecord(yesterdayKey);
    const pct = appData.conducted > 0 ? appData.attended / appData.conducted * 100 : 0;

    // Morning (8-10 AM): Missed yesterday
    if (now.getHours() >= 8 && now.getHours() < 11) {
      triggerIfDue('morning_reminder', `Generate a single short humorous morning notification (max 12 words) telling a student they forgot to mark yesterday's attendance. Gently sarcastic. English only.`, "Yesterday's attendance is missing. Did you even exist? 👻", () => notMarkedToday && !yesterdayRecord && !yesterdayIsOff, 2000);
    }

    // 4:30 PM Reminder
    if (now.getHours() >= 16 && now.getMinutes() >= 30) {
      triggerIfDue('afternoon_reminder', `Generate a single short humorous notification (max 12 words) reminding a student to mark their college attendance for today. Be funny, not preachy. English only.`, "Time to mark attendance! Your data won't fill itself 📊", () => notMarkedToday && !isTodayOff, 2000);
    }

    // 9:00 PM Urgent Reminder
    if (now.getHours() >= 21) {
      triggerIfDue('urgent_reminder', `Generate a single short humorous notification (max 12 words) urgently reminding a student who STILL hasn't marked attendance. Slightly dramatic. English only.`, "Still not marked? Your attendance graph is crying 📉", () => notMarkedToday && !isTodayOff, 2000);
    }

    // Sunday 8 PM - Weekly Roast & Export Reminder
    if (now.getDay() === 0 && now.getHours() >= 20) {
      triggerIfDue('sunday_roast', `Generate one short humorous line (max 15 words) roasting a student's attendance habits for the week. English only.`, "This week: 2 full days, 3 disasters. Growth? Debatable.", () => true, 2000);
      triggerIfDue('export_reminder', `Generate a short humorous notification (max 15 words) reminding a student to backup their app data. Slightly paranoid about data loss. English only.`, "Back up your data. Phones die. Semesters don't wait 📦", () => {
        if (!appData.last_exported_at) return true;
        const diff = now.getTime() - new Date(appData.last_exported_at).getTime();
        return diff > 7 * 24 * 60 * 60 * 1000;
      }, 5000);
    }

    // Danger Zone
    triggerIfDue('danger_alert', `Generate a short humorous notification (max 15 words) warning a student their attendance is dangerously close to minimum threshold. Alarmed tone. English only.`, "One more bunk and you're in the danger zone ⚠️", () => pct >= appData.target && pct <= appData.target + 2, 3000);

    // Low / Critical
    triggerIfDue('critical_alert', `Generate a short humorous notification (max 15 words) telling a student they are officially in attendance survival mode. Dramatic. English only.`, "Survival mode activated. Attend everything. No exceptions 🆘", () => pct > 0 && pct < appData.target - 5, 3000);

    // Late Night
    if (now.getHours() === 1 || now.getHours() === 2 || now.getHours() === 3) {
      triggerIfDue('late_night', `Generate a single short humorous notification (max 15 words) telling a student using the app past 1AM to just sleep. Caring but funny. English only.`, "Sleep > everything at this point. Close the tab 😴", () => true, 2000);
    }
  };
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const {
      outcome
    } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPWA(false);
      try {
        const db = await initDB();
        await db.put('settings', {
          key: 'installPrompted',
          value: true
        });
      } catch (e) {}
    }
  };
  const handleDismissPWA = async () => {
    setShowPWA(false);
    try {
      const db = await initDB();
      await db.put('settings', {
        key: 'installPrompted',
        value: true
      });
    } catch (e) {}
  };
  const handleSave = async newData => {
    await saveAttendanceData(newData);
    setData(newData);
    setIsEditing(false);
    showInAppToast("Data saved successfully!");
  };
  const handleUpdateData = async newData => {
    setData(newData);
    await saveAttendanceData(newData);
  };
  const handleExportData = async () => {
    try {
      const db = await initDB();
      const stores = ['dailyRecords', 'settings', 'streaks'];
      const exportDataObj = {};
      for (const store of stores) {
        exportDataObj[store] = await db.getAll(store);
      }
      const json = JSON.stringify({
        app: 'Bunkoo Meter',
        version: '2.0',
        exported_at: new Date().toISOString(),
        data: exportDataObj
      }, null, 2);
      const blob = new Blob([json], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const today = new Date();
      a.download = `bunkoo-backup-${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      // Update last_exported_at
      const newD = {
        ...data,
        last_exported_at: new Date().getTime()
      };
      await saveAttendanceData(newD);
      setData(newD);
      showToast('Data exported successfully 📦 Save this file somewhere safe!');
    } catch (e) {
      showToast('Failed to export data.');
    }
  };
  const restoreSnapshot = async snapshot => {
    const db = await initDB();
    for (const [store, records] of Object.entries(snapshot)) {
      await db.clear(store);
      for (const record of records) {
        await db.add(store, record);
      }
    }
  };
  const getAllDataSnapshot = async () => {
    const db = await initDB();
    const stores = ['dailyRecords', 'settings', 'streaks'];
    const snapshot = {};
    for (const store of stores) {
      snapshot[store] = await db.getAll(store);
    }
    return snapshot;
  };
  const handleImportData = async file => {
    const text = await file.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      showToast("This file doesn't look right. Only Bunkoo Meter backup files work here 🤔");
      return;
    }
    if (parsed.app !== 'Bunkoo Meter' || !parsed.data) {
      showToast("This file doesn't look right. Only Bunkoo Meter backup files work here 🤔");
      return;
    }
    if (!window.confirm('This will replace ALL your current data. Are you sure? This cannot be undone.')) {
      return;
    }
    const snapshot = await getAllDataSnapshot(); // Safety backup

    try {
      const db = await initDB();
      for (const [store, records] of Object.entries(parsed.data)) {
        await db.clear(store);
        for (const record of records) {
          await db.add(store, record);
        }
      }
      showToast('Data restored successfully ✅ Welcome back!');
      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      await restoreSnapshot(snapshot);
      showToast('Import failed halfway. Your old data has been preserved 🛡️');
    }
  };

  // Make available globally for Init screen hack
  window.handleImportData = handleImportData;
  const [deleteStep, setDeleteStep] = useState(0);
  const handleDeleteData = async () => {
    if (deleteStep === 0) {
      if (window.confirm("This will permanently delete everything. Are you absolutely sure?")) {
        setDeleteStep(1);
        setTimeout(() => {
          if (window.confirm("Last chance. This is permanent.")) {
            executeDeleteAll();
          } else {
            setDeleteStep(0);
          }
        }, 100);
      }
    }
  };
  const executeDeleteAll = async () => {
    try {
      // If creator of an active room, delete it first
      if (data && data.activeRoomCode && data.localUserId) {
        if (typeof firebase !== 'undefined') {
          const dbRef = firebase.firestore();
          const roomDoc = dbRef.collection("rooms").doc(data.activeRoomCode);
          const snap = await roomDoc.get();
          if (snap.exists && snap.data().creatorId === data.localUserId) {
            await roomDoc.delete();
          }
        }
      }
      const db = await initDB();
      await db.clear('settings');
      await db.clear('dailyRecords');
      await db.clear('streaks');
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      showToast("Failed to delete all data.");
    }
  };
  const dataWithActions = data ? {
    ...data,
    onExportData: handleExportData,
    onImportData: handleImportData,
    onDeleteData: handleDeleteData
  } : null;
  const status = useMemo(() => data ? calculateStats(data).status : "safe", [data]);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative min-h-screen text-zinc-100 font-sans"
  }, /*#__PURE__*/React.createElement(AuroraBackground, {
    status: status
  }), /*#__PURE__*/React.createElement("header", {
    className: "fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 py-2 sm:py-4 flex items-center justify-between backdrop-blur-md bg-[#09090b]/60 border-b border-white/10 shadow-lg shadow-black/50 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 sm:gap-3 flex-1 min-w-0 justify-start"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./logo.png",
    alt: "Bunkoo Meter",
    className: "h-8 sm:h-12 md:h-14 w-auto object-contain"
  }), /*#__PURE__*/React.createElement("p", {
    className: "hidden lg:block text-[10px] sm:text-xs text-zinc-500 font-mono truncate"
  }, currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  }))), data && !isEditing && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center flex-shrink-0 mx-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-zinc-900/80 rounded-full border border-white/10 p-1 shadow-inner"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentTab("home"),
    className: `px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm rounded-full transition-all ${currentTab === "home" ? "bg-purple-600 text-white font-bold shadow-md" : "text-zinc-400 hover:text-white"}`
  }, "Home"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentTab("friends"),
    className: `px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm rounded-full transition-all flex items-center gap-1 ${currentTab === "friends" ? "bg-purple-600 text-white font-bold shadow-md" : "text-zinc-400 hover:text-white"}`
  }, "Friends"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 sm:gap-3 md:gap-4 flex-1 min-w-0 justify-end"
  }, data && !isEditing && /*#__PURE__*/React.createElement(React.Fragment, null, deferredPrompt && /*#__PURE__*/React.createElement("button", {
    onClick: handleInstallClick,
    className: "flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[9px] sm:text-xs font-bold hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all shadow-[0_0_10px_rgba(139,92,246,0.4)] sm:shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400/30 flex-shrink-0 mr-0.5 sm:mr-0"
  }, /*#__PURE__*/React.createElement(Download, {
    size: 12,
    className: "sm:w-[14px] sm:h-[14px] animate-bounce",
    style: {
      animationDuration: '2s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline tracking-wide"
  }, "Download App"), /*#__PURE__*/React.createElement("span", {
    className: "sm:hidden tracking-wide"
  }, "App")), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex flex-col items-end truncate"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-zinc-500"
  }, "Current"), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-bold ${calculateStats(data).currentPercentage >= data.target ? "text-emerald-400" : "text-red-400"}`
  }, calculateStats(data).currentPercentage.toFixed(1), "%")), /*#__PURE__*/React.createElement(NotificationBell, {
    data: data
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsEditing(true),
    className: "p-1.5 sm:p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex-shrink-0",
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 18,
    className: "sm:w-5 sm:h-5"
  }))))), /*#__PURE__*/React.createElement("main", {
    className: "pt-20 sm:pt-24 px-3 sm:px-4 md:px-6 min-h-screen flex flex-col items-center relative z-10"
  }, !migrated ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center min-h-[70vh]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-zinc-400"
  }, "Loading...")) : !data || !isAttendanceDataComplete(data) || isEditing ? /*#__PURE__*/React.createElement("div", {
    key: "form",
    className: !data || !isAttendanceDataComplete(data) ? "w-full flex flex-col items-center py-8" : "w-full h-full flex items-center justify-center min-h-[70vh]"
  }, /*#__PURE__*/React.createElement(InputForm, {
    initialData: dataWithActions,
    onSave: handleSave,
    onCancel: data ? () => setIsEditing(false) : undefined,
    isInitial: !isAttendanceDataComplete(data)
  })) : currentTab === "friends" ? /*#__PURE__*/React.createElement("div", {
    key: "friends",
    className: "w-full animate-fade-in"
  }, /*#__PURE__*/React.createElement(FriendsPage, {
    data: {
      ...data,
      onUpdateData: handleUpdateData,
      onShowToast: showToast,
      onShowInAppToast: showInAppToast
    }
  })) : /*#__PURE__*/React.createElement("div", {
    key: "dashboard",
    className: "w-full animate-fade-in"
  }, /*#__PURE__*/React.createElement(Dashboard, {
    data: {
      ...data,
      onUpdateData: handleUpdateData,
      onShowToast: showToast,
      onShowInAppToast: showInAppToast
    }
  }))), notification && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-500/90 backdrop-blur-md text-white shadow-lg flex items-center gap-2 animate-slide-up"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium"
  }, notification.message)), showPWA && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 left-4 right-4 z-50 bg-[#09090b]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "text-blue-400",
    size: 24
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-white"
  }, "Install Bunkoo for faster daily marking"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDismissPWA,
    className: "text-xs text-zinc-400 hover:text-white transition-colors"
  }, "Dismiss"), /*#__PURE__*/React.createElement("button", {
    onClick: handleInstallClick,
    className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white transition-all"
  }, "Install"))));
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "24px",
          textAlign: "center",
          background: "#09090b",
          color: "#fff"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: "48px",
          marginBottom: "16px"
        }
      }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("h2", {
        style: {
          marginBottom: "8px",
          fontSize: "24px"
        }
      }, "Oops, something went wrong!"), /*#__PURE__*/React.createElement("p", {
        style: {
          color: "#a1a1aa",
          marginBottom: "24px"
        }
      }, "An unexpected error occurred. Please refresh the page to try again."), /*#__PURE__*/React.createElement("button", {
        onClick: () => window.location.reload(),
        style: {
          padding: "12px 24px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }
      }, "Refresh Page"));
    }
    return this.props.children;
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));
