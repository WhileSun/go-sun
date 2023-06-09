import { Table, Form, message, Button, Tooltip, Pagination } from 'antd';
import { SettingOutlined, ReloadOutlined, SearchOutlined, MinusSquareOutlined, PlusSquareOutlined, OrderedListOutlined } from '@ant-design/icons';
import { WsTableProps, ApiResp } from './types';
import React, { useMemo, useState, useEffect, forwardRef,useImperativeHandle } from 'react';
import { paramIsset, getRandStr, parseFormParamsTools, toTreeTools, arrayColumnTools,filterNameTools } from './utils/tools';
import HeaderSearchForm from './components/HeaderSearchForm';
import ColumnShowTool from './components/ColumnShowTool';
import HeaderButton from './components/HeaderButton';
import initColumnFunc from './func/initColumn';
import initShowColumnFunc from './func/initShowColumn';
import './Table.less';

const InternalWsTable:React.ForwardRefRenderFunction<any,WsTableProps> = (props,ref) => {
  const [formRef] = Form.useForm();

  const config = useMemo(() => {
    console.log("config");
    let param: WsTableProps = { th: [], searchs: [] };
    param.th = paramIsset(props.th, []);
    param.size = paramIsset(props.size, 'small');
    param.rowKey = paramIsset(props.rowKey, 'id');
    param.display = paramIsset(props.display, 'fluid');
    param.api = paramIsset(props.api, new Promise((vals) => { }));
    param.mode = paramIsset(props.mode, 'normal');
    param.checkbox = paramIsset(props.checkbox, false);
    param.treeTable = paramIsset(props.treeTable, false);
    param.footHeight = paramIsset(props.footHeight, 43);
    param.divId = paramIsset(props.divId, getRandStr('table'));

    param.data = paramIsset(props.data, []);
    param.storeModel = props.storeModel;
    param.otherFormParams = props.otherFormParams;
    param.onLocalFilter = props.onLocalFilter;

    param.page = paramIsset(props.page, 1);
    param.pageSize = paramIsset(props.pageSize, 50);
    return param;
  }, [props]);

  useEffect(() => {
    console.log('storeModel', props.storeModel?.params);
  }, [props.storeModel?.params])

  const [apiresp, setApiresp] = useState<ApiResp>({}); //api原生数据
  const [apiData, setApiData] = useState<Array<any>>([]); //api经过内部转化数据
  const [loading, setLoading] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<Array<React.Key>>([]); //表格选中的ID
  const [modalShow, setModalShow] = useState<boolean>(paramIsset(props.modalShow, true)); //弹出框是否显示
  //tree table
  const [expandedRowKeys, setExpandedRowKeys] = useState<Array<React.Key>>([]); //展开的节点ID
  const [rowKeys, setRowKeys] = useState<Array<React.Key>>([]); //当前所有节点ID
  const [treeTableshow, setTreeTableshow] = useState(true);  //是否是树形表
  //列设置
  const initShowColumn = useMemo(() => { return initShowColumnFunc(config.th) }, []); //表格字段的字段和值
  const [showColumns, setShowColumns] = useState(initShowColumn.allKeys); //表格展示的字段,默认全部
  const [searchFormShow, setSearchFormShow] = useState(true); //是否显示搜索框

  //table column等配置信息
  const tableSetting = useMemo(() => {
    return initColumnFunc(config.th, showColumns)
  }, [showColumns]);


  /** merge defalut params and other params*/
  const defaultFormParams = { 'pageSize': config.pageSize, 'page': config.page, ...config.otherFormParams };
  const [formParams, setFormParams] = useState<{ [key: string]: any }>(defaultFormParams);

  /**  set form params */
  const setFormParamsFunc = (newParam: { [key: string]: any }, mode: 'page' | 'submit' | 'init') => {
    let params = {};
    if (mode == 'page') {
      /** 只改变page参数 */
      params = { ...formParams, ...newParam };
    } else if (mode == 'submit') {
      /**  默认参数+now page+ newParam**/
      let newDefaultFormParams = { ...defaultFormParams, page: formParams.page };
      params = { ...newDefaultFormParams, ...newParam };
    } else if (mode == 'init') {
      /** 默认参数+（{} or storeModel.params） */
      params = { ...defaultFormParams, ...newParam };
    }
    setFormParams(params);
    return params;
  }

  /**  set StoreModel params */
  const setStoreModelParamsFunc = (values: { [key: string]: any }) => {
    config.storeModel?.setParams({ ...config.storeModel?.params, [config.storeModel.name]: values });
  }

  /** change page */
  const handleChangePage = (page: number) => {
    console.log('handleChangePage');
    let params = setFormParamsFunc({ page: page }, 'page');
    getData(params);
  };

  /** form rest search*/
  const handleFormReset = () => {
    console.log('handleFormReset');
    setStoreModelParamsFunc({});
    formRef.resetFields();
    let params = setFormParamsFunc({}, 'init');
    getData(params);
  };

  /** form submit */
  const handleFormSubmit = (values: { [key: string]: any }) => {
    console.log('handleFormSubmit');
    /** 针对本地数据筛选，一般针对tree table使用 */
    if (config.onLocalFilter) {
      config.onLocalFilter(parseFormParamsTools(values))
    } else {
      setStoreModelParamsFunc(values);
      let params = setFormParamsFunc(parseFormParamsTools(values), 'submit');
      getData(params);
    }
  };

  /** table reload  */
  const handleTableReload = () => {
    getData(formParams);
  }

  /** trans table data */
  /** key need parent_id */
  const transTableDataFunc = (data: Array<any>) => {
    if (config.treeTable) {
      setRowKeys(arrayColumnTools(data, "id") as Array<React.Key>);
      return toTreeTools(data);
    }
    return data;
  }

  /** get data  */
  const getData = async (apiParams = {}) => {
    setLoading(true);
    if (config.api === undefined) {
      setLoading(false);
      return
    }
    let api: Promise<any> = config.api.call(this, apiParams)
    api.then(function (resp) {
      console.log('resp', resp);
      resp.total = 1000;
      setApiresp(resp);
      setApiData(transTableDataFunc(resp.data));
      setLoading(false);
      if (resp.code != 0) {
        message.error(resp.msg);
      }
    }).catch(function (error) {
      setLoading(false);
      message.error("列表获取异常，请联系管理员处理！");
      console.log('error', error);
    });
  };


  useEffect(() => {
    /** 初始化查询参数，开启storeModel会加载历史查询数据 */
    let initParams = config.storeModel?.params[config.storeModel.name]
    let params = setFormParamsFunc(parseFormParamsTools(initParams), 'init');
    getData(params);
    //初始化设置字段数据
    formRef.setFieldsValue(initParams);
  }, []);

  /** table 映射func*/
  if(props.table !== undefined){
    var tableInstance = props.table;
    tableInstance.reload = () => { console.log('reload'); handleTableReload(); };
    tableInstance.getCheckedIds = () => { return checkedIds; };
    tableInstance.getDataList = () => { return apiresp.data };
    tableInstance.filterName = (dataIndex:string, val:any) => {
      if (val) {
        setApiData(filterNameTools(transTableDataFunc(apiresp.data), dataIndex, val))
      } else {
        setApiData(transTableDataFunc(apiresp.data))
      }
    };
    useImperativeHandle(ref,()=>tableInstance);
  }
  
  //header Form
  const headerSearchForm = useMemo(() => {
    return (
      <>
        <HeaderSearchForm
          formRef={formRef}
          searchConfig={props.searchConfig}
          searchs={props.searchs}
          handleFormSubmit={handleFormSubmit}
        />
      </>
    );
  }, []);


  // header toolbar left 
  const headerToolbarLeft = useMemo(() => {
    const fieldLen = Object.keys(props.searchs).length;
    return (
      <>
        {props.toolbars !== undefined ? props.toolbars
          .filter((toolbar) => toolbar.align == 'left')
          .map((toolbar, index) => {
            console.log(toolbar);
            return (
              <div key={index}>
                {toolbar.render()}
              </div>
            );
          }) : ""}
        <HeaderButton btns={props.btns} align="left" />
        {fieldLen > 0 ? (
          <div className="header-toolbar-left-items">
            <Button type="primary" onClick={() => { formRef.submit(); }} style={{ marginRight: '10px' }} loading={loading}>
              查询
            </Button>
            <Button htmlType="button" onClick={handleFormReset} loading={loading}>
              重置
            </Button>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }, [loading])


  // header toolbar righttoolbars
  const headerToolbarRight = useMemo(() => {
    const iconStyle = { fontSize: '16px', marginRight: '15px' };
    const treeFunc = () => {
      if (treeTableshow) {
        setExpandedRowKeys(rowKeys);
      } else {
        setExpandedRowKeys([]);
      }
      setTreeTableshow(!treeTableshow)
    }

    return (
      <>
        {props.toolbars !== undefined ? props.toolbars
          .filter((toolbar) => toolbar.align == 'right')
          .map((toolbar, index) => {
            console.log(toolbar);
            return (
              <div key={index}>
                {toolbar.render()}
              </div>
            );
          }) : ""}
        <HeaderButton btns={props.btns} align="right" />
        <div className='header-toolbar-right-items'>
          {config.treeTable ?
            <Tooltip placement="top" title='Tree Table 展开/隐藏'>
              {treeTableshow ? <PlusSquareOutlined style={iconStyle} onClick={treeFunc} /> :
                <MinusSquareOutlined style={iconStyle} onClick={treeFunc} />}
            </Tooltip>
            : ""}
          <Tooltip placement="top" title='搜索框显示/隐藏'>
            <SearchOutlined style={iconStyle} onClick={() => {
              setSearchFormShow(!searchFormShow);
            }} />
          </Tooltip>
          <Tooltip placement="top" title='刷新'>
            <ReloadOutlined style={iconStyle} onClick={handleTableReload} />
          </Tooltip>
          <ColumnShowTool
            data={initShowColumn}
            showColumns={showColumns}
            setShowColumns={(keys:string[]) => { setShowColumns(keys) }}
            solt={(<Tooltip placement="top" title='列设置'><SettingOutlined style={{ fontSize: '16px' }} /></Tooltip>)}
          />
        </div>
      </>
    )
  }, [searchFormShow, showColumns, treeTableshow, rowKeys])

  const tableHtml = (
    <>
      <div style={{ position: 'relative', height: '100%', minWidth: '0px' }}>
        <div className={config.divId + " ws-table " + (config.display == 'fixed' ? 'ws-table-fixed' : '')}>
          <div className="ws-table-header">
            <div className="header-search-form" style={{ display: searchFormShow ? "block" : 'none' }}>
              {headerSearchForm}
            </div>
            <div className="header-toolbar">
              <div className="header-toolbar-left">{headerToolbarLeft}</div>
              <div className="header-toolbar-right">{headerToolbarRight}</div>
            </div>
          </div>
          <div className="ws-table-container">
            <Table
              rowSelection={config.checkbox ? {
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                  setCheckedIds(selectedRowKeys);
                }
              } : undefined}
              columns={tableSetting.columns}
              dataSource={apiData}
              bordered={true}
              size={config.size}
              rowKey={config.rowKey}
              scroll={tableSetting.tableScroll}
              loading={loading}
              // expandRowByClick={true}
              onExpandedRowsChange={(expandedRows) => {
                setExpandedRowKeys(expandedRows);
              }}
              expandedRowKeys={expandedRowKeys}
              pagination={false}
              onChange={(paginate, filters, sorter, extra) => {
                if (extra.action === 'paginate') {
                  handleChangePage(paginate.current!);
                }
              }}
            // onRow={(record, index) => {
            //   return {
            //     onClick: event => {
            //       // console.log(event);
            //       if (event.target.dataset.act !== undefined && props.rowBtnsClick !== undefined) {
            //         props.rowBtnsClick(event.target.dataset.act, record);
            //       }
            //     },
            //   };
            // }}
            />
          </div>
          <div className="ws-table-footer">
            <Pagination
              size='small'
              current={formParams.page}
              pageSize={formParams.pageSize}
              showSizeChanger={false}
              total={apiresp.total}
              showTotal={total => `共 ${total} 条`}
              onChange={(page, pageSize) => { handleChangePage(page) }}
            />
          </div>
        </div>
      </div>
    </>
  );
  return tableHtml;
  //输出样式
  if (config.mode == 'modal') {
    // return (
    //   <WsModal
    //     content={tableHtml}
    //     show={modalShow}
    //     width={paramIsset(props.width, 800)}
    //     title={paramIsset(props.title, '列表')}
    //     cancel={() => { setModalShow(false); if (props.cancel()) { props.cancel() }; }}
    //   />
    // )
  } else {
    return tableHtml;
  }
}

const WsTable = forwardRef(InternalWsTable)
export default WsTable;