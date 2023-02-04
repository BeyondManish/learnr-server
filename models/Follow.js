import mongoose from "mongoose";

// user can follow a user, tag or group
// type: user, tag, group
/**
 * @openapi
 * components:
 *  schemas:
 *   Follow:
 *    type: object
 *    properties:
 *      userId:
 *        type: string
 *        format: ObjectId
 *        ref: User
 *        required: true
 *      type:
 *        type: string
 *        enum: [user, tag, group]
 *        required: true
 *      followId:
 *        type: string
 *        format: ObjectId
 *        required: true
 *        refPath: type
 */

const FollowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["user", "tag", "group"],
    required: true
  },
  followId: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: "type"
  },
}, { timestamps: true });

const Follow = mongoose.model("Follow", FollowSchema);
export default Follow;    