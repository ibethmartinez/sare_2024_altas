/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.org.inegi.sare_2024_altas_services.Backing;

import mx.org.inegi.sare_2024_altas_db.Interfaces.InterfaceReportes;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.org.inegi.sare_2024_altas_services.utils.Response;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.export.JRCsvExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author FABIOLA.RUIZ
 */
@Service("BackingReportes")
public class BackingReportes {

    @Autowired
    @Qualifier("datosConexionDao")
    private InterfaceReportes InterfaceReportes;

    public Response getReporte(String tipo, String numeroReporte, HttpServletRequest request, HttpServletResponse response, String ce) {
        Response respuesta = new Response();
        String nombreArchivoJRXMLPunteados = request.getServletContext().getRealPath("/WEB-INF/reportes/reporGeogra_avances_ege_excel.jrxml");
        String tipoArchivo = tipo;
        String reporte;
        String whereReporte = "";
        String nombreArchivo = "";
        String nombreArchivoAdescargar = "reporte";
        Connection conne = null;
        String URLImagen = request.getServletContext().getRealPath("/WEB-INF/reportes/imagenes/");
        Map params = new HashMap();
        try {
              Date myDate = new Date();
            if (numeroReporte.equalsIgnoreCase("1")) {
                params.put("URL", URLImagen);
                String paramCE = "where 1=1 ";
                if (!ce.equalsIgnoreCase("00")) {
                    paramCE = "where ce='".concat(ce).concat("'");
                }
                params.put("ce", paramCE);
                nombreArchivoJRXMLPunteados = request.getServletContext().getRealPath("/WEB-INF/reportes/reporteAvancePunteados");
                nombreArchivoAdescargar = "RepeporteAvancePunteados_" + new SimpleDateFormat("dd-MM-yyyy").format(myDate);
            } else {
                if (numeroReporte.equalsIgnoreCase("2")) {
                    String paramCE = "where 1=1 ";
                    if (ce.length() != 2 && !ce.substring(1, 3).equalsIgnoreCase("00")) {
                        paramCE = " and b.ce like'%".concat(ce.substring(1, 3)).concat("'");
                    }
                    if (ce.length() == 2 && !ce.equalsIgnoreCase("00")) {
                        paramCE = " and b.ce like'%".concat(ce).concat("'");
                    }
                    params.put("ce", paramCE);
                    params.put("URL", URLImagen);
                    nombreArchivoJRXMLPunteados = request.getServletContext().getRealPath("/WEB-INF/reportes/reporteEstablecimientosPunteados");
                    nombreArchivoAdescargar = "ReportedeEstablecimientosPunteados_" + new SimpleDateFormat("dd-MM-yyyy").format(myDate);
                } else {
                    if (numeroReporte.equalsIgnoreCase("3")) {
                        String paramCE = "where 1=1 ";
                        if (!ce.equalsIgnoreCase("00")) {
                            paramCE = "where ce='".concat(ce).concat("'");
                        }
                        params.put("ce", paramCE);
                        params.put("URL", URLImagen);
                        nombreArchivoJRXMLPunteados = request.getServletContext().getRealPath("/WEB-INF/reportes/reporteAvancePunteoPorCodigo");
                       nombreArchivoAdescargar = "ReportedeAvancePorCodigo_" + new SimpleDateFormat("dd-MM-yyyy").format(myDate);
                    } else {
                        String paramCE = " and  1=1 ";
                        if (ce.length() != 2 && !ce.substring(1, 3).equalsIgnoreCase("00")) {
                            paramCE = " and ce ='".concat(ce.substring(1, 3)).concat("'");
                        }
                        if (ce.length() == 2 && !ce.equalsIgnoreCase("00")) {
                            paramCE = " and ce='".concat(ce).concat("'");
                        }
                        params.put("ce", paramCE);
                        params.put("URL", URLImagen);
                        nombreArchivoAdescargar = "ReportedeEstablecimientosPendientesPunteo_" + new SimpleDateFormat("dd-MM-yyyy").format(myDate);
                        nombreArchivoJRXMLPunteados = request.getServletContext().getRealPath("/WEB-INF/reportes/reporteEstablecimientosPendientesPunteo");
                    }
                }
            }

            nombreArchivo = nombreArchivoJRXMLPunteados;
            conne = InterfaceReportes.getDs().getConnection();
            if (tipoArchivo.equals("EXCEL")) {
                exportaExcel(response, nombreArchivo+"_xls.jrxml", conne, params, nombreArchivoAdescargar);
            } else if (tipoArchivo.equals("PDF") && (conne != null)) {
                exportaPDF(response, nombreArchivo+".jrxml", conne, params, nombreArchivoAdescargar);
            } else if (tipoArchivo.equals("CSV")) {
                exportaCSV(response, nombreArchivo, conne, params, nombreArchivoAdescargar);
            } else {
                respuesta.setValor("false, No selecciono ningun reporte");
                //Respuesta.setMensaje(new cat_mensaje("false", "No selecciono ningun reporte"));
            }
        } catch (Exception es) {
            es.printStackTrace();
        } finally {
            try {
                if (conne != null) {
                    conne.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        return respuesta;
    }

    private void exportaPDF(HttpServletResponse response, String nombreArchivo, Connection conne, Map params, String nombreArchivoAdescargar) throws JRException {
        response.setContentType("application/pdf");
        JasperReport js;
        JasperPrint jp;
        try {
            ServletOutputStream out = response.getOutputStream();
            js = JasperCompileManager.compileReport(nombreArchivo);
            jp = JasperFillManager.fillReport(js, params, conne);
            byte[] bites = JasperExportManager.exportReportToPdf(jp);
            response.setHeader("Content-disposition", "inline; filename=" + nombreArchivoAdescargar + ".pdf");
            response.setContentLength(bites.length);
            out = response.getOutputStream();
            out.write(bites);
            out.flush();
            out.close();
        } catch (IOException | JRException e) {
        }
    }

    private void exportaExcel(HttpServletResponse response, String nombreArchivo, Connection conne, Map params, String nombreArchivoAdescargar) {
        response.setContentType("application/vnd.ms-excel");
        ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
        JRXlsExporter exporterXLS = new JRXlsExporter();
        try (ServletOutputStream out = response.getOutputStream()) {
            JasperReport report = JasperCompileManager.compileReport(nombreArchivo);
            JasperPrint print = JasperFillManager.fillReport(report, params, conne);
            exporterXLS.setParameter(JRXlsExporterParameter.JASPER_PRINT, print);
            exporterXLS.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, arrayOutputStream);
            exporterXLS.exportReport();
            response.setHeader("Content-disposition", "attachment; filename=" + nombreArchivoAdescargar + ".xls");
            response.setContentLength(arrayOutputStream.toByteArray().length);
            out.write(arrayOutputStream.toByteArray());
            out.flush();
        } catch (IOException | JRException e) {
        }
    }

    private void exportaCSV(HttpServletResponse response, String nombreArchivo, Connection conne, Map params, String nombreArchivoAdescargar) {
        response.setContentType("text/csv");
        ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
        JRCsvExporter exporterXLS = new JRCsvExporter();
        try (ServletOutputStream out = response.getOutputStream()) {
            JasperReport report = JasperCompileManager.compileReport(nombreArchivo);
            JasperPrint print = JasperFillManager.fillReport(report, params, conne);
            exporterXLS.setParameter(JRXlsExporterParameter.JASPER_PRINT, print);
            exporterXLS.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, arrayOutputStream);
            exporterXLS.setParameter(JRCsvExporterParameter.CHARACTER_ENCODING, "ISO-8859-1");
            exporterXLS.exportReport();
            response.setHeader("Content-disposition", "inline; filename=" + nombreArchivoAdescargar + ".csv");
            response.setContentLength(arrayOutputStream.toByteArray().length);
            out.write(arrayOutputStream.toByteArray());
            out.flush();
        } catch (IOException | JRException e) {
        }
    }

}
