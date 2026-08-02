import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
    height: '100%',
  },
  inputLoader: {
    marginLeft: 8,
  },
  dropdown: {
    marginTop: 4,
    maxHeight: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  rowTextWrapper: {
    flex: 1,
    marginRight: 8,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  secondaryText: {
    fontSize: 12,
    color: '#8A8A8E',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginLeft: 12,
  },
  emptyText: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#8A8A8E',
    textAlign: 'center',
  },
});
