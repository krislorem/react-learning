import { useEffect, useRef } from 'react';
import Cherry from 'cherry-markdown';
import 'cherry-markdown/dist/cherry-markdown.css'; // 核心样式

const CherryEditor = ({ initialValue, isPreview }) => {
  const containerRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    // 初始化配置
    const config = {
      id: 'markdown-container',
      value: initialValue,
      engine: {
        global: {
          classicBr: false  // 启用现代换行模式
        },
        syntax: {
          table: {
            enableChart: true  // 启用表格转图表
          }
        }
      },
      externals: {
        mermaid: {
          theme: 'dark'  // mermaid主题配置
        }
      },
      isPreviewOnly: isPreview,
      toolbars: {
        toc: true
      }
    };

    // 单例模式初始化（网页5性能建议）
    if (!editorInstance.current) {
      editorInstance.current = new Cherry(config);
    }

    // 值更新处理（网页3局部更新特性）
    const handleValueChange = () => {
      if (editorInstance.current.getValue() !== initialValue) {
        editorInstance.current.setValue(initialValue);
      }
    };
    handleValueChange();

    return () => {
      // 销毁实例
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [initialValue]); // 监听initialValue变化

  return (
    <div
      id="markdown-container"
      ref={containerRef}
      style={{
        height: '80vh',
        border: '1px solid #e8e8e8',
        borderRadius: 8,
        overflow: 'hidden'
      }}
    />
  );
};

export default CherryEditor;
