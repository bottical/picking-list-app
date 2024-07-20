import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Item {
  productName: string;
  quantity: string;
}

interface PickingData {
  pickingNo: string;
  customerName: string;
  items: Item[];
}

const simplifiedData: PickingData[] = [
  {
    pickingNo: 'PC00004144094',
    customerName: '菅原寛珠',
    items: [
      { productName: '使い方', quantity: '1' },
      { productName: 'ダイアリーチェックシート(2)', quantity: '1' },
      { productName: '特別優待券＆サポート商品紹介', quantity: '1' },
      { productName: 'NEWﾅｲﾄｱｲﾎﾞｰﾃ2(3mL/ｱｲｽﾃｨｯｸ付)', quantity: '1' }
    ]
  },
  {
    pickingNo: 'PC00004144095',
    customerName: '齊藤晴香',
    items: [
      { productName: '■プレミアムガイドブック', quantity: '1' },
      { productName: '使い方', quantity: '1' },
      { productName: 'ケアブック', quantity: '1' },
      { productName: 'ダイアリーチェックシート(1)', quantity: '1' },
      { productName: 'NEWﾅｲﾄｱｲﾎﾞｰﾃ2(3mL/ｱｲｽﾃｨｯｸ付)', quantity: '1' }
    ]
  },
  {
    pickingNo: 'PC00004144096',
    customerName: '三ツ井明子',
    items: [
      { productName: '使い方', quantity: '1' },
      { productName: 'ダイアリーチェックシート(2)', quantity: '1' },
      { productName: '特別優待券＆サポート商品紹介', quantity: '1' },
      { productName: 'NEWﾅｲﾄｱｲﾎﾞｰﾃ2(3mL/ｱｲｽﾃｨｯｸ付)', quantity: '1' }
    ]
  },
  {
    pickingNo: 'PC00004144097',
    customerName: '三浦清彦',
    items: [
      { productName: '使い方', quantity: '1' },
      { productName: 'ダイアリーチェックシート(2)', quantity: '1' },
      { productName: '特別優待券＆サポート商品紹介', quantity: '1' },
      { productName: 'NEWﾅｲﾄｱｲﾎﾞｰﾃ2(3mL/ｱｲｽﾃｨｯｸ付)', quantity: '1' }
    ]
  },
  {
    pickingNo: 'PC00004144098',
    customerName: '小林佳子',
    items: [
      { productName: '使い方', quantity: '1' },
      { productName: 'ダイアリーチェックシート(2)', quantity: '1' },
      { productName: '特別優待券＆サポート商品紹介', quantity: '1' },
      { productName: 'NEWﾅｲﾄｱｲﾎﾞｰﾃ2(3mL/ｱｲｽﾃｨｯｸ付)', quantity: '1' }
    ]
  }
];

const PickingListApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, isConfirming]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setIsConfirming(false);
  };

  const handleNext = () => {
    if (currentIndex === simplifiedData.length - 1) {
      setIsConfirming(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleConfirm = () => {
    console.log('検品確定');
    setIsConfirming(false);
    setCurrentIndex(0);
  };

  const currentPickingData = simplifiedData[currentIndex];

  const renderPickingNo = (pickingNo: string) => {
    const prefix = pickingNo.slice(0, -4);
    const suffix = pickingNo.slice(-4);
    return (
      <span>
        {prefix}
        <span className="text-2xl font-bold text-blue-600">{suffix}</span>
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ピッキングリスト</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              ピッキングNO: {renderPickingNo(currentPickingData.pickingNo)}
            </h2>
            <p className="text-lg text-gray-600">購入者: {currentPickingData.customerName}</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {currentIndex + 1} / {simplifiedData.length}
          </div>
        </div>
        <ul className="space-y-2">
          {currentPickingData.items.map((item, index) => (
            <li 
              key={index} 
              className={`flex items-center justify-between p-2 rounded ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <span className="font-medium flex-grow">{item.productName}</span>
              <span className="text-4xl font-bold text-blue-600 ml-4 w-16 text-center">
                {item.quantity}
              </span>
            </li>
          ))}
        </ul>
        {isConfirming ? (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-4">
              これまでのピッキングNOについて検品を確定してもよろしいでしょうか？
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirming(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                戻る
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              <ChevronLeft size={20} />
              前へ
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              次へ
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickingListApp;