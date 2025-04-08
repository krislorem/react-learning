import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from 'react';
import { AtCard, AtInput, AtButton, AtTimeline, AtRadio, AtForm } from "taro-ui";
import "./index.scss";

const AccountBook = () => {
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [records, setRecords] = useState([]);
  const [type, setType] = useState('支出');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit = () => {
    if (!amount || !type) {
      Taro.showToast({
        title: '请填写金额和类型',
        icon: 'none'
      });
      return;
    }

    const newRecord = {
      type,
      amount: parseFloat(amount) * (type === '收入' ? 1 : -1),
      remark,
      date: new Date().toISOString()
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    setTotalAmount(updatedRecords.reduce((sum, item) => sum + item.amount, 0));
    Taro.setStorage({
      key: 'accountRecords',
      data: updatedRecords
    });

    setAmount('');
    setRemark('');
    Taro.showToast({ title: '保存成功', icon: 'success' });
  };

  useEffect(() => {
    Taro.getStorage({
      key: 'accountRecords',
      success: res => {
        const sortedRecords = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(sortedRecords);
      },
      fail: () => {
        Taro.setStorageSync('accountRecords', [])
        setRecords([])
      }
    });
  }, []);

  return (
    <View className='account-book'>
      <AtCard title='记账本'>
        <AtForm>
          <AtInput
            name='amount'
            title='金额'
            type='number'
            placeholder='请输入金额'
            value={amount}
            onChange={setAmount}
            required
          />
          <AtInput
            name='remark'
            title='备注'
            type='text'
            placeholder='请输入备注'
            value={remark}
            onChange={setRemark}
          />
          <View className='radio-group'>
            <AtRadio
              options={[
                { label: '支出', value: '支出' },
                { label: '收入', value: '收入' }
              ]}
              value={type}
              onClick={(value) => setType(value)}
            />
          </View>
          <AtButton type='primary' onClick={handleSubmit}>提交</AtButton>
        </AtForm>
        <View className='summary-area'>
          <View className='total-amount'>
            当前总额：¥{totalAmount.toFixed(2)}
          </View>
          <AtButton
            type='secondary'
            size='small'
            onClick={() => {
              Taro.setStorage({ key: 'accountRecords', data: [] });
              setRecords([]);
              setTotalAmount(0);
              Taro.showToast({ title: '记录已清空', icon: 'success' });
            }}
          >
            清除记录
          </AtButton>
        </View>

        {/* 时间线展示区域 */}
        <View className='timeline-area'>
          <AtTimeline
            items={records.map(record => ({
              title: `${record.type === '收入' ? '+' : '-'}¥${Math.abs(record.amount).toFixed(2)}`,
              color: record.type === '收入' ? 'green' : 'red',
              content: [record.remark, new Date(record.date).toLocaleDateString()]
            }))}
          />
        </View>
      </AtCard>
    </View>
  );
};

export default AccountBook;
