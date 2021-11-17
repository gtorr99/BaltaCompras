package br.com.baltacompras.serviceimplement;

import java.io.File;
import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class Email {

    @Autowired
    private JavaMailSender javaMailSender;

    public Email(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String[] listTo, String assunto, String mensagem) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(listTo);
        msg.setSubject(assunto);
        msg.setText(mensagem);
        javaMailSender.send(msg);
    }

    public void sendEmailWithAttachment(String[] listTo, String assunto, String mensagem, String arquivo)
            throws MessagingException, IOException {
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(listTo);
        helper.setSubject(assunto);
        helper.setText(mensagem, true);
        if (arquivo != null) {
            FileSystemResource file = new FileSystemResource(new File(arquivo));
            helper.addAttachment(file.getFilename(), file);
        }
        javaMailSender.send(msg);
    }
}
