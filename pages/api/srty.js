import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let { town, yes } = req.body;

  let collection = await db.collection("srty-answers");

  var query = {};
  query.town = town;

  let existingTownEntry = await collection.find(query).toArray();

  if (existingTownEntry.length === 0) {
    await collection.insertOne(req.body);
  }

  if (existingTownEntry.length === 1) {
    let updateField = yes === 1 ? "yes" : "no";
    let updateObject = {
      [updateField]: existingTownEntry[0][updateField] + 1,
    };
    await collection.update(query, { $set: updateObject });
  }

  res.json({ message: "success" });
};
