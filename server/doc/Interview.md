## **Create Interview**

Creates a new Interview

- **Method:** `POST`
- **URL:** /api/interview
- **URL Params:** None

### **Data Params**

- **Required:** `date: Date` `difficulty: enum: [0, 1, 2, 3, 4]`
- **Optional:** `guest: ObjectId` `theme: String` `questions: [ObjectId]` `isFinished: Boolean`

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .post("api/interview", {
    date: "2021-04-15T23:00:22.388+00:00",
    difficulty: 2,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Get list of Interviews**

Returns a JSON Object containing a list with the interviews in which the current user is enrolled

- **Method:** `GET`
- **URL:** /api/interview
- **URL Params:** None

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .get("api/interview")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Get a single Interview**

Returns a JSON Object containing a single Interview

- **Method:** `GET`
- **URL:** /api/interview/:id
- **URL Params:**
  - **Required:** `id: string`

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .get("api/interview/608497a5d064584ec82544ba")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Update specific Interview**

Updates the specified Interview

- **Method:** `PUT`
- **URL:** /api/interview/:id
- **URL Params:**
  - **Required:** `id: string`

### **Data Params**

- **Required:** `owner: ObjectId` `date: Date` `difficulty: enum: [0, 1, 2, 3, 4]`
- **Optional:** `guest: ObjectId` `theme: String` `questions: [ObjectId]` `isFinished: Boolean`

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .put("api/interview/608497a5d064584ec82544ba", {
    owner: "608492efc8b3242cb49011d7",
    guest: "6084920a9d04f54c88a04958",
    theme: "Array manipulation",
    date: "2021-04-15T23:00:22.388+00:00",
    difficulty: 2,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Add Guest to Interview**

Updates the specified Interview adding the current user as a guest

- **Method:** `PUT`
- **URL:** /api/interview/guest/:id
- **URL Params:**
  - **Required:** `id: string`

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .put("api/interview/guest/608497a5d064584ec82544ba")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Delete Interview**

Deletes the specified Interview

- **Method:** `DELETE`
- **URL:** /api/interview/:id
- **URL Params:**
  - **Required:** `id: string`

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .delete("api/interview/guest/608497a5d064584ec82544ba")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```
