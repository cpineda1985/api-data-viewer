import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileDataTable from './FileDataTable';

// Variable de control para usar mock o no
const useMock = true; // Cambia a false si deseas pruebas reales contra el servicio del api backend

// Mock global fetch con condicional para permitir llamadas reales si se desea
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!useMock) {
      return fetch(url, options);
    }

    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('FileDataTable', () => {
  test('debería renderizar el input de búsqueda', () => {
    render(<FileDataTable useMock={useMock} />);
    expect(screen.getByPlaceholderText(/filtrar por filename/i)).toBeInTheDocument();
  });

  test('debería mostrar mensaje cuando no hay resultados', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await act(async () => {
      render(<FileDataTable useMock={useMock} />);
    });
    await waitFor(() => {
      expect(screen.getByText(/sin resultados/i)).toBeInTheDocument();
    });
  });

  test('debería llamar al backend con el nombre de archivo al escribir y buscar', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await act(async () => {
      render(<FileDataTable useMock={useMock} />);
    });
    const input = screen.getByPlaceholderText(/filtrar por filename/i);
    fireEvent.change(input, { target: { value: 'test3.csv' } });
    fireEvent.click(screen.getByText(/buscar/i));
    await waitFor(() => {
      const lastCall = global.fetch.mock.calls.find(call => call[0].includes('fileName=test3.csv'));
      expect(lastCall).toBeDefined();
    });
  });

  test('debería llamar al backend con includeEmpty=true al activar el botón', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await act(async () => {
      render(<FileDataTable useMock={useMock} />);
    });
    fireEvent.click(screen.getByText(/incluir vacíos/i));
    await waitFor(() => {
      const lastCall = global.fetch.mock.calls.find(call => call[0].includes('includeEmpty=true'));
      expect(lastCall).toBeDefined();
    });
  });

  test('debería mostrar mensaje de carga mientras se esperan los datos', async () => {
    global.fetch.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => [] }), 100)));
    await act(async () => {
      render(<FileDataTable useMock={useMock} />);
    });
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });
  });

  test('debería manejar correctamente un error 404 del backend', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({})
    });
    await act(async () => {
      render(<FileDataTable useMock={useMock} />);
    });
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(/no se encontraron resultados/i);
    });
  });

  test('debería limpiar el input al presionar el botón Limpiar', () => {
    render(<FileDataTable useMock={useMock} />);
    const input = screen.getByPlaceholderText(/filtrar por filename/i);
    fireEvent.change(input, { target: { value: 'test.csv' } });
    fireEvent.click(screen.getByText(/limpiar/i));
    expect(input.value).toBe('');
  });
});
