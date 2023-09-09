import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const ClickHistory = ({ history }) => {
    // インラインスタイル定義
    const styles = {
        container: {
            display: 'table',
            margin: '0 auto',
            justifyContent: 'center'
        },
        centeredCell: {
            textAlign: 'center'  // セルのテキストを中央揃えにするためのスタイル
        }
    };

    return (
        <div style={styles.container}>
            <Table isHeaderSticky aria-label="Click History">
                <TableHeader>
                    <TableColumn key="clickNumber" style={styles.centeredCell}>クリック数</TableColumn>
                    <TableColumn key="clickedAt" style={styles.centeredCell}>時間</TableColumn>
                    <TableColumn key="displayName" style={styles.centeredCell}>ID</TableColumn>
                </TableHeader>
                <TableBody items={history}>
                    {(item) => (
                        <TableRow key={String(item.docId)}>
                            {(columnKey) => {
                                if (columnKey === "clickedAt") {
                                    return (
                                        <TableCell style={styles.centeredCell}>
                                            {new Date(item.clickedAt.seconds * 1000).toLocaleString()}
                                        </TableCell>
                                    );
                                }
                                return <TableCell style={styles.centeredCell}>{item[columnKey]}</TableCell>;
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ClickHistory;
