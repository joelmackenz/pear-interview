## **Create Feedback**

Creates a new Feedback

- **Method:** `POST`
- **URL:** /api/feedback
- **URL Params:** None

### **Data Params**

- **Required:** `interview: ObjectId` `candidate: ObjectId` `overallScore: Number` `communication: Number` `codeEfficiency: Number` `codeOrganization: Number` `speed: Number` `debugging: Number` `problemSolving: Number`

- **Optional:** `didWell: String` `canImprove: String` `recommendedResources: String` `additionalFeedback: String` `experienceRating: Number ` `experienceDescription: String`

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .post("api/feedback", {
    interview: "60849738d064584ec82544b6",
    candidate: "608492efc8b3242cb49011d7",
    overallScore: 3,
    communication: 4,
    codeEfficiency: 2,
    codeOrganization: 1,
    speed: 5,
    debugging: 4,
    problemSolving: 5,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Get list of Feedbacks**

Returns a JSON Object containing a reduced list with the current user's feedbacks

- **Method:** `GET`
- **URL:** /api/feedback
- **URL Params:** None

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .get("api/feedback")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## **Get a single Feedback**

Returns a JSON Object containing a single Feedback

- **Method:** `GET`
- **URL:** /api/feedback/:id
- **URL Params:**
  - **Required:** `id: string`

### **Data Params**

None

### **Sample Call**

Make sure that withCredentials is set to true:
`axios.defaults.withCredentials = true;`

```javascript
axios
  .get("api/feedback/6088420ea439f962e04db271")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```
