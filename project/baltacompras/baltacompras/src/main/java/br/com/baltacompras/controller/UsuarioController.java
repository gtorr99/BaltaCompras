package br.com.baltacompras.controller;

import java.util.List;
import java.util.Objects;

import br.com.baltacompras.model.UsuarioDto;
import br.com.baltacompras.model.enums.Status;
import br.com.baltacompras.serviceimplement.Email;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Or;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Usuario;
import br.com.baltacompras.repository.UsuarioRepository;

@RestController
@RequestMapping("/administracao/usuario")
public class UsuarioController {
        @Or({
                @Spec(path = "id", spec = Equal.class),
                @Spec(path = "email", spec = Equal.class),
        })
    interface ModelSpec<Usuario> extends NotDeletedEntity<Usuario> {
    }

    @Autowired
    private UsuarioRepository repositorio;

    @Autowired
    private Email email;

    @GetMapping("/listar")
    public List<Usuario> listar(ModelSpec<Usuario> spec){
        return repositorio.findAll(spec);
    }
    
    @PostMapping("/salvar")
    public void salvar(@RequestBody Usuario usuario){
        repositorio.save(usuario);
    }

    @PutMapping("/alterar")
    public void alterar(@RequestBody Usuario usuario){
        if(usuario.getId()>0){
            repositorio.save(usuario);
        }
    }

    @DeleteMapping("/excluir/{id}")
    public void excluir(@PathVariable Integer id){
        Usuario usuario = repositorio.getById(id);
        usuario.setStatus(Status.DELETADO);
        repositorio.save(usuario);
    }

    @PostMapping("/validar")
    public ResponseEntity<?> validar(@RequestBody UsuarioDto u) {
        Usuario usuario = repositorio.findFirstByEmail(u.getEmail());
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não cadastrado!");
        }
        if (!Objects.equals(usuario.getHashSenha(), u.getHashSenha())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Senha incorreta!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(usuario);
    }

    @PostMapping("/email")
    public void enviarEmailParaRecuperarSenha(@RequestParam(value = "link") String link,
                                          @RequestParam(value = "destinatarios") String[] destinatarios,
                                          @RequestParam(value = "mensagem") String mensagem,
                                          @RequestParam(value = "assunto") String assunto) throws Exception {
        if (link != null) {
            mensagem += "<br><br><a href=" + link + ">Clique aqui para recuperar a senha</a>";
        }
        String arquivo = null;
        email.sendEmailWithAttachment(destinatarios, assunto, mensagem, arquivo);
    }
}
