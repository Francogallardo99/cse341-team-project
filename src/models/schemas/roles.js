import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
        name: {
          enum: ["admin", "customer"],
            type: String,
            required: true,
            unique: true,
        },
  },
  { timestamps: true }
);

const role = mongoose.model("Role", roleSchema);
export default role;