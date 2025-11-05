import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";
import toast from "react-hot-toast";

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // 🔹 Ambil semua Krama
  const { data: kramas, isLoading: loadingKrama } = useQuery({
    queryKey: ["kramas"],
    queryFn: async () => {
      const res = await apiClient.get("/krama");
      return res.data;
    },
  });

  // 🔹 Ambil tagihan berdasarkan krama_id
  const getTagihanByKrama = async (krama_id) => {
    const res = await apiClient.get(`/tagihan/krama/${krama_id}`);
    return res.data;
  };

  // 🔹 Tambah pembayaran
  const addPembayaran = useMutation({
    mutationFn: async (data) => {
      const res = await apiClient.post("/pembayaran", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pembayaran"]);
      toast.success("Pembayaran berhasil disimpan!");
    },
    onError: () => {
      toast.error("Gagal menambahkan pembayaran!");
    },
  });

  // 🔹 Ambil semua pembayaran
  const { data: pembayaran, isLoading: loadingPembayaran } = useQuery({
    queryKey: ["pembayaran"],
    queryFn: async () => {
      const res = await apiClient.get("/pembayaran");
      return res.data;
    },
  });

  return (
    <BillingContext.Provider
      value={{
        kramas,
        loadingKrama,
        getTagihanByKrama,
        addPembayaran,
        pembayaran,
        loadingPembayaran,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => useContext(BillingContext);
