package br.com.baltacompras.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class Arquivo {
    public static final String DEFAULT_ENCODING = "ISO-8859-1";

    public static final String QUEBRA_LINHA = "\r\n";

    public static final String BARRA = "/";

    public static BufferedReader getReader(File file) throws Exception {
        return new BufferedReader(new InputStreamReader(new FileInputStream(file), DEFAULT_ENCODING));
    }

    public static BufferedWriter getWriter(File file) throws Exception {
        return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), DEFAULT_ENCODING));
    }

}
