import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',    
    padding: 20,             
    backgroundColor: '#fff', 
    paddingBottom: 50,
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },

  categoryLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  seleccionadaLabel: {
    fontSize: 16,
    color: '#555',
  },
 
  categoryList: {
    marginTop: 10,
    marginBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30, 
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },

  categoryPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  categoryPreviewImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 15,
    backgroundColor: '#fff',
  },
  categoryPreviewInfo: {
    flex: 1,
  },
  categoryPreviewTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  categoryPreviewHint: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },
  categoryPreviewChevron: {
    fontSize: 18,
    color: '#999',
    marginLeft: 8,
  },
  pickerWrapper: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
});



export default styles;
