import { Router } from 'express';
import { csvUpload } from '../../../../../../utils/upload';

const settingsRouter = Router();


settingsRouter.post(
  "/upload-file",
  csvUpload.single('file'),
  () => console.log("helloooooo file")
)

export default settingsRouter
