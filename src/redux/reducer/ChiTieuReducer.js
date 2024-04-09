import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listChiTieu: [],
  filteredListChiTieu: [], 
  filterKeyword: '',
};

const chiTieuSlice = createSlice({
  name: 'ChiTieu',
  initialState,
  reducers: {
    addChiTieu(state, action) {
      const newChiTieu = action.payload;
      state.listChiTieu.push(newChiTieu);
      if (state.filteredListChiTieu.length === 0 || 
          newChiTieu.tieuDe.toLowerCase().includes(state.filterKeyword.toLowerCase())) {
        state.filteredListChiTieu.push(newChiTieu);
      }
    },
    deleteChiTieu(state, action) {
      const deletedId = action.payload;
      state.listChiTieu = state.listChiTieu.filter(
        chiTieu => chiTieu.id !== deletedId
      );
      state.filteredListChiTieu = state.filteredListChiTieu.filter(
        chiTieu => chiTieu.id !== deletedId
      );
    },
    updateChiTieu(state, action) {
      const { id, tieuDe, moTa, ngayThuChi, loaiThuChi, soTien } = action.payload;
      const chiTieuIndex = state.listChiTieu.findIndex(chiTieu => chiTieu.id === id);
      if (chiTieuIndex !== -1) {
        // Update the item in both lists
        state.listChiTieu[chiTieuIndex] = {
          ...state.listChiTieu[chiTieuIndex],
          tieuDe,
          moTa,
          ngayThuChi,
          loaiThuChi,
          soTien
        };
        const updatedChiTieu = state.listChiTieu[chiTieuIndex];
        const filteredIndex = state.filteredListChiTieu.findIndex(
          chiTieu => chiTieu.id === id
        );
        if (filteredIndex !== -1) {
          state.filteredListChiTieu[filteredIndex] = updatedChiTieu;
        }
      }
    },
    searchChiTieu(state, action) {
      const { keyword } = action.payload;
      state.filterKeyword = keyword;
      if (keyword.trim() === '') {
        state.filteredListChiTieu = state.listChiTieu;
      } else {
        state.filteredListChiTieu = state.listChiTieu.filter(
          chiTieu => chiTieu.tieuDe.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    }
  },
});

export const { addChiTieu, deleteChiTieu, updateChiTieu, searchChiTieu } = chiTieuSlice.actions;
export default chiTieuSlice.reducer;
