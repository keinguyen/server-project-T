import { Injectable } from "@nestjs/common";
import firebaseAdminOriginal from "firebase-admin";
import { FIREBASE_INFO } from "./firebase-service-account";

const firebaseAdmin = firebaseAdminOriginal.initializeApp({
  credential: firebaseAdminOriginal.credential.cert({
    clientEmail: FIREBASE_INFO.client_email,
    privateKey: FIREBASE_INFO.private_key,
    projectId: FIREBASE_INFO.project_id,
  }),
});
@Injectable()
export class NotificationService {
  async push() {
    const res = await firebaseAdmin.messaging().send({
      token:
        "cWklf2rtR7yEYugSun_Z1_:APA91bGS5ScUlfuTxxXEOm7M37hDr6MUN9u4q4yY8Ts8RLdIoMkovWnQgJG0_0rrJTWKZZgn9yNIdt7EKuG2UK3KfYCpF0-6yRjm4mVxYcbJIDiMUu8Ur9NyREOMOFwRlsAP33ECdhIb",
    });

    console.log("****** res ******", res);
  }
}
