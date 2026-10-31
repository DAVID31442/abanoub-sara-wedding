# دليل ربط رسائل التهاني بـ Google Sheets 📊

لربط الموقع بجدول Google Sheets حقيقي ليتم تسجيل كل رسالة يكتبها الضيوف في شيت إكسيل خاص بكيرلس وميرا فوراً، اتبع هذه الخطوات البسيطة (تأخذ دقيقتين فقط):

---

### الخطوة 1: إنشاء شيت جوجل جديد
1. افتح المتصفح واذهب إلى الرابط: [https://sheets.new](https://sheets.new) لفتح شيت جديد.
2. سمّ الشيت مثلاً: **«رسائل وتهاني زفاف كيرلس وميرا»**.

---

### الخطوة 2: فتح محرر الأكواد (Apps Script)
1. من القائمة العلوية في Google Sheets، اضغط على **ملحقات (Extensions)** ثم اختر **Apps Script**.
2. امسح أي كود موجود في الصفحة، وضع بدلاً منه هذا الكود:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // إذا كان الجدول جديداً، ننشئ العناوين تلقائياً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ والوقت", "اسم المهنئ", "صلة القرابة", "الرسالة للذكرى"]);
      sheet.getRange(1, 1, 1, 4)
        .setFontWeight("bold")
        .setBackground("#511419")
        .setFontColor("#f7e7a9")
        .setHorizontalAlignment("center");
      sheet.setColumnWidth(1, 160);
      sheet.setColumnWidth(2, 180);
      sheet.setColumnWidth(3, 140);
      sheet.setColumnWidth(4, 350);
    }
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
    var name = data.name || "فاعل خير";
    var relation = data.relation || "غير محدد";
    var message = data.message || "";
    
    sheet.appendRow([timestamp, name, relation, message]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### الخطوة 3: نشر الكود كرابط ويب (Deploy as Web App)
1. في أعلى يمين صفحة Apps Script، اضغط على الزر الأزرق **Deploy (نشر)** ثم اختر **New deployment (نشر جديد)**.
2. بجانب **Select type (اختيار النوع)** اضغط على الترس واختر **Web app (تطبيق ويب)**.
3. اكتب في الوصف: `Wedding Wishes API`.
4. في خانة **Who has access (من يملك حق الوصول)**: اختر **Anyone (أي شخص)** (مهم جداً حتى يتمكن الموقع من إرسال الرسائل).
5. اضغط على **Deploy**، ثم امنح الصلاحيات (Authorize access) بحساب جوجل الخاص بك.
6. انسخ الرابط الذي سينتج واسمه: **Web app URL** (يبدأ بـ `https://script.google.com/macros/s/...`).

---

### الخطوة 4: وضع الرابط في الموقع
افتح ملف `index.html` وابحث في أسفل الصفحة عن السطر:
```javascript
const GOOGLE_SHEETS_WEBAPP_URL = "";
```
وضع الرابط الخاص بك بين علامتي التنصيص:
```javascript
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

مبروك! الآن كلما كتب أي ضيف تهنئة في الموقع:
1. ستظهر التهنئة فوراً على شاشة الموقع في **سجل المباركات**.
2. ستُحفظ تلقائياً في سطر جديد بجدول Google Sheets للعروسين مع التاريخ والوقت واسم المهنئ وصلة القرابة! 🎉
