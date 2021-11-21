package br.com.baltacompras.controller;

import java.util.List;
import java.util.Objects;

import br.com.baltacompras.model.UsuarioDto;
import br.com.baltacompras.model.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.baltacompras.model.Usuario;
import br.com.baltacompras.repository.UsuarioRepository;

@RestController
@RequestMapping("/administracao/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repositorio;

    @GetMapping("/listar")
    public List<Usuario> listar(){
        return repositorio.findAll();
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
}
