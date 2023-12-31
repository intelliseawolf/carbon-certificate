import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { fetchCertificates } from "../../services/certificateService";
import { Certificate, PaginationQuery } from "../../types/certificate";

interface CertificateState {
  certificates: Certificate[];
  status: "idle" | "loading" | "failed";
  favoriteCertificates: Certificate[];
  certificatesTotal: number;
}

const initialState: CertificateState = {
  certificates: [],
  status: "idle",
  favoriteCertificates: [],
  certificatesTotal: 0,
};

export const getCertificates = createAsyncThunk(
  "certificate/getCertificates",
  async ({ page, limit }: PaginationQuery) => {
    const response: AxiosResponse = await fetchCertificates({ page, limit });

    return response.data;
  }
);

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    handleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const favoriteIndex = state.favoriteCertificates.findIndex(
        (certificate) => certificate.id === id
      );

      if (favoriteIndex !== -1) {
        state.favoriteCertificates.splice(favoriteIndex, 1);
      }

      state.certificates = state.certificates.map(
        (certificate: Certificate) => {
          if (certificate.id === id) {
            const newCertificate = {
              ...certificate,
              isFavorite: favoriteIndex === -1,
            };
            if (favoriteIndex === -1) {
              state.favoriteCertificates.push(newCertificate);
            }

            return newCertificate;
          }

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
        state.certificatesTotal = action.payload.result.meta.totalItems;

        const data = action.payload.result.data;

        state.certificates = data.map((item: Certificate) => ({
          ...item,
          isFavorite:
            state.favoriteCertificates.findIndex(
              (certificate) => certificate.id === item.id
            ) !== -1,
        }));
      })
      .addCase(getCertificates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice.reducer;
