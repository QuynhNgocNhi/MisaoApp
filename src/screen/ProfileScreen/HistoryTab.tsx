import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HistoryTimeStampItem from './HistoryTimeStampItem';
const MyProductList = ({ products, buyRequest }: any) => {
  console.log({ products });
  // console.log({ buyRequest });
  // const data = products.concat(buyRequest);
  const groupBy = (_k: any, a: any) =>
    a?.reduce(
      (r: any, { [_k]: k, ...p }) => ({
        ...r,
        ...{
          [k]: r[k] ? [...r[k], { ...p }] : [{ ...p }]
        }
      }),
      {}
    );

  let grouped = groupBy('updated_at', products);
  let keys = grouped ? Object.keys(grouped) : [];
  return (
    <ScrollView style={styles.container}>
      {keys.map((key, index) => (
        <HistoryTimeStampItem
          data={grouped[key]}
          key={index}
          date={moment(key).format('DD-MM-YYYY')}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff'
  }
});

export default MyProductList;
