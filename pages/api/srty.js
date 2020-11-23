import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let { town, yes, no } = req.body;
  // console.log("town -", town, "\n", "yes -", yes, "\n", "no -", no);

  let collection = await db.collection("srty-answers");

  var query = {};
  query.town = town;
  // console.log(query);

  let existingTownEntry = await collection.find(query).toArray();
  // console.log(existingTownEntry);

  if (existingTownEntry.length === 0) {
    await collection.insertOne(req.body);
  }

  if (existingTownEntry.length === 1) {
    let updateField = yes === 1 ? "yes" : "no";
    let updateObject = {
      [updateField]: existingTownEntry[0][updateField] + 1,
    };
    // console.log(updateObject);
    await collection.update(query, { $set: updateObject });
  }

  res.json({ message: "success" });
};
