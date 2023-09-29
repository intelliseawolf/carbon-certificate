import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { fetchCertificates } from "../../services/certificateService";
import { Certificate } from "../../types/certificate";

interface CertificateState {
  certificates: Certificate[];
  status: "idle" | "loading" | "failed";
  favorites: number[];
}

const initialState: CertificateState = {
  certificates: [],
  status: "idle",
  favorites: [],
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
  reducers: {
    handleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const favoriteIndex = state.favorites.indexOf(id);

      if (favoriteIndex === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(favoriteIndex, 1);
      }

      state.certificates = state.certificates.map(
        (certificate: Certificate) => {
          if (certificate.id === id)
            return {
              ...certificate,
              isFavorite: favoriteIndex === -1 ? true : false,
            };
          return certificate;
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCertificates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.status = "idle";
        const data = action.payload.result.data;

        state.certificates = data.map((item: Certificate) => ({
          ...item,
          isFavorite: state.favorites.indexOf(item.id) !== -1,
        }));
      })
      .addCase(getCertificates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice.reducer;
