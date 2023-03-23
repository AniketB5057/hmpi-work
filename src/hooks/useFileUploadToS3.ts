import { axios_instance } from "../config"
import axios from "axios"
import { getItem } from "../utils/localStorage"
import { PresignedURLResponse } from "../types/allTypes"

export const getPresignURLToUpload = async (
  filename: string,
  filetype: string
): Promise<PresignedURLResponse> => {
  try {
    const token = `${getItem(`authkey`)}`
    const result = await axios_instance.get(
      `/user/get-presigned-url?filename=${filename}&filetype=${filetype}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (result.status === 201 || result.status === 200) {
      return result.data
    }
    return {
      uploadURL: "",
      downloadURL: "",
    }
  } catch (err) {
    console.log(err)
    return {
      uploadURL: "",
      downloadURL: "",
    }
  }
}
export const singleImageUpload = async (
  presignedURL: string,
  imageFile: File
): Promise<string | null> => {
  try {
    const token = `${getItem(`authkey`)}`
    var options = {
      headers: {
        "Content-Type": imageFile.type,
      },
    }
    const result = await axios.put(`${presignedURL}`, imageFile, options)
    if (result.status === 201 || result.status === 200) {
      return result.data
    }
    return null
  } catch (err) {
    return null
  }
}
