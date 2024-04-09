import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ActionBtn from '../ActionBtn';
import {
  addChiTieu,
  deleteChiTieu,
  searchChiTieu,
  updateChiTieu,
} from '../src/redux/reducer/ChiTieuReducer';
import SearchBar from '../SearchBar';

const QuanLyChiTieuScreen = () => {
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [ngayThuChi, setNgayThuChi] = useState('');
  const [loaiThuChi, setLoaiThuChi] = useState('');
  const [soTien, setSoTien] = useState('');
  const [editTieuDe, setEditTieuDe] = useState('');
  const [editMoTa, setEditMoTa] = useState('');
  const [editNgayThuChi, setEditNgayThuChi] = useState('');
  const [editLoaiThuChi, setEditLoaiThuChi] = useState('');
  const [editSoTien, setEditSoTien] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [searchTieuDe, setSearchTieuDe] = useState('');
  const [checked, setChecked] = useState('Chi');
  const [totalThu, setTotalThu] = useState(0);
  const [totalChi, setTotalChi] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const listChiTieu = useSelector(
    state => state.listChiTieu.filteredListChiTieu,
  );
  useEffect(() => {
    let totalThuTemp = 0;
    let totalChiTemp = 0;
    listChiTieu.forEach(item => {
      if (item.loaiThuChi === 'Thu') {
        totalThuTemp += parseFloat(item.soTien);
      } else {
        totalChiTemp += parseFloat(item.soTien);
      }
    });
    setTotalThu(totalThuTemp);
    setTotalChi(totalChiTemp);
  }, [listChiTieu]);

  const handleAddChiTieu = () => {
    let duLieu = {
      id: Math.random().toString(),
      tieuDe: tieuDe,
      moTa: moTa,
      ngayThuChi: ngayThuChi,
      loaiThuChi: loaiThuChi,
      soTien: soTien,
    };
    dispatch(addChiTieu(duLieu));
  };

  const handleDeleteChiTieu = id => {
    console.log(id);
    dispatch(deleteChiTieu(id));
  };

  const handleEdit = item => {
    setIsModalVisible(true);
    setEditTieuDe(item.tieuDe);
    setEditMoTa(item.moTa);
    setEditNgayThuChi(item.ngayThuChi);
    setEditLoaiThuChi(item.loaiThuChi);
    setEditSoTien(item.soTien);
    setEditItemId(item.id);
    setIsEditing(true);
  };

  const handleSearch = () => {
    console.log('Search text:', searchTieuDe);
    dispatch(searchChiTieu({keyword: searchTieuDe}));
    console.log(listChiTieu);
  };

  const handleUpdate = () => {
    dispatch(
      updateChiTieu({
        id: editItemId,
        tieuDe: editTieuDe,
        moTa: editMoTa,
        ngayThuChi: editNgayThuChi,
        loaiThuChi: editLoaiThuChi,
        soTien: editSoTien,
      }),
    );
    setIsEditing(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Tìm Kiếm Tiêu Đề"
            onChangeText={txt => setSearchTieuDe(txt)}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nhập tiêu đề"
            onChangeText={txt => setTieuDe(txt)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nhập mô tả"
            onChangeText={txt => setMoTa(txt)}
            style={styles.input}
          />
          <TextInput
            placeholder="Nhập ngày thu chi"
            onChangeText={txt => setNgayThuChi(txt)}
            style={styles.input}
          />
          <View style={styles.radioContainer}>
            <Text>Loại thu chi:</Text>
            <RadioButton.Group
              onValueChange={newValue => setLoaiThuChi(newValue)}
              value={loaiThuChi}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginStart: 23,
                }}>
                <View style={styles.radioOption}>
                  <Text>Chi</Text>
                  <RadioButton value="Chi" />
                </View>
                <View style={styles.radioOption}>
                  <Text>Thu</Text>
                  <RadioButton value="Thu" />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <TextInput
            placeholder="Nhập số tiền"
            onChangeText={txt => setSoTien(txt)}
            style={styles.input}
            keyboardType="numeric"
          />
          <ActionBtn title="Thêm" onPress={handleAddChiTieu} />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng số tiền thu: {totalThu}</Text>
          <Text style={styles.totalText}>Tổng số tiền chi: {totalChi}</Text>
        </View>
        <View style={styles.listContainer}>
          {listChiTieu.map(row => (
            <View key={row.id} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{row.tieuDe}</Text>
              <Text style={styles.itemDetail}>Mô tả: {row.moTa}</Text>
              <Text style={styles.itemDetail}>
                Ngày thu chi: {row.ngayThuChi}
              </Text>
              <Text style={styles.itemDetail}>
                Loại thu chi: {row.loaiThuChi}
              </Text>
              <Text style={styles.itemDetail}>Số tiền: {row.soTien}</Text>
              <View style={styles.itemPro}>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDeleteChiTieu(row.id)}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEdit(row)}
                  style={[styles.button, styles.editButton]}>
                  <Text style={styles.buttonText}>Chỉnh Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh Sửa Chi Tiêu</Text>
            <TextInput
              value={editTieuDe}
              onChangeText={setEditTieuDe}
              style={styles.input}
              placeholder="Tiêu đề"
            />
            <TextInput
              value={editMoTa}
              onChangeText={setEditMoTa}
              style={styles.input}
              placeholder="Mô tả"
            />
            <TextInput
              value={editNgayThuChi}
              onChangeText={setEditNgayThuChi}
              style={styles.input}
              placeholder="Ngày thu chi"
            />
            <View style={styles.radioContainer}>
              <Text style={styles.radioLabel}>Loại thu chi:</Text>
              <RadioButton.Group
                onValueChange={newValue => setEditLoaiThuChi(newValue)}
                value={editLoaiThuChi}>
                <View style={styles.radioOption}>
                  <Text>Chi</Text>
                  <RadioButton value="Chi" />
                </View>
                <View style={styles.radioOption}>
                  <Text>Thu</Text>
                  <RadioButton value="Thu" />
                </View>
              </RadioButton.Group>
            </View>
            <TextInput
              value={editSoTien}
              onChangeText={setEditSoTien}
              style={styles.input}
              placeholder="Số tiền"
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleUpdate}>
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'papayawhip',
    paddingHorizontal: 24,
    paddingTop: 11,
    paddingBottom: 11,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ECEFF1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    width: '100%',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  listContainer: {
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPro: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#005b96',
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: '23%',
  },
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioLabel: {
    marginRight: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',

    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
});

export default QuanLyChiTieuScreen;
