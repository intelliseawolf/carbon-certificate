import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { fetchCertificates } from "../../services/certificateService";
import { Certificate } from "../../types/certificate";

interface CertificateState {
  certificates: Certificate[];
  status: "idle" | "loading" | "failed";
}

const initialState: CertificateState = {
  certificates: [],
  status: "idle",
};

export const getCertificates = createAsyncThunk(
  "certificate/getCertificates",
  async () => {
    const response: AxiosResponse = await fetchCertificates();

    return response.data;
  }
);

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCertificates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.status = "idle";
        state.certificates = action.payload.result.data;
      })
      .addCase(getCertificates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default certificateSlice.reducer;
